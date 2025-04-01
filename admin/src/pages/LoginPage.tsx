import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth'; // Ensure this points to your updated auth.ts
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useAuth(); // Use updated useAuth hook
  const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/dashboard"); // Redirect to dashboard if already authenticated
        return;
      }
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(username, password);
    if (success) {
      //console.log('Login successful', success);
      navigate("/dashboard"); // Redirect after successful login
      return;
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C1C1E]">
      <div className="max-w-md w-full space-y-8 p-8 bg-[#262627] rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#F3F3F4]">
           Ownyth Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-muted focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-muted focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {error && (
            <div className="text-clay text-sm text-center">{error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9055FF] to-[#4F3CFF] hover:from-[#4050a3] hover:to-[#4050a3] text-softWhite font-semibold"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
