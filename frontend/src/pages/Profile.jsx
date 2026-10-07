import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Save, UserRound } from 'lucide-react';
import { getProfile, updateProfile } from '../api/profileApi';

const getAccountEmail = () => {
  const savedEmail = localStorage.getItem('email');
  if (savedEmail) return savedEmail;

  const token = localStorage.getItem('token');
  if (!token) return '';

  try {
    const encodedPayload = token.split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const payload = JSON.parse(atob(encodedPayload));
    return typeof payload.sub === 'string' ? payload.sub : '';
  } catch {
    return '';
  }
};

const Profile = () => {
  const [email] = useState(getAccountEmail);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (!email) {
        setError('Unable to determine the email address for this account. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile(email);
        if (isMounted) {
          setName(profile.name || '');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.response?.data?.message || 'Could not load your profile. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const updatedProfile = await updateProfile({ name: name.trim(), email });
      setName(updatedProfile.name || name.trim());
      setSuccess('Your profile has been updated.');
      localStorage.setItem('name', updatedProfile.name || name.trim());
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not update your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const initials = name.trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl space-y-8 p-2 md:p-6"
    >
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-orange-500">
          Your account
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">Profile</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage the personal details connected to your spiritual journey.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-5 bg-gradient-to-r from-teal-50 to-emerald-50 p-6 dark:from-slate-800 dark:to-slate-900 md:p-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-lg shadow-teal-600/20 dark:bg-orange-600 dark:shadow-orange-600/20">
            {initials || <UserRound size={28} />}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-slate-800 dark:text-white">
              {name || 'Your profile'}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}
          {success && (
            <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              {success}
            </p>
          )}

          <div>
            <label htmlFor="profile-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Full name
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                id="profile-name"
                name="name"
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSuccess('');
                }}
                disabled={loading || saving}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="profile-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                id="profile-email"
                type="email"
                value={email}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">Your email address is used to identify your account.</p>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">
            <button
              type="submit"
              disabled={loading || saving || !name.trim() || !email}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-600 dark:shadow-orange-600/20 dark:hover:bg-orange-700"
            >
              <Save size={18} />
              {loading ? 'Loading profile...' : saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Profile;
