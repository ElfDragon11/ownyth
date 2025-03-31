import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from "react-router-dom";

interface WaitlistEntry {
  id: number;
  email: string;
  full_name: string;
  date_added: string;
  source: string;
}

const ITEMS_PER_PAGE = 10;

export function DashboardPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newSource, setNewSource] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("DashboardPage isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      setLocation('/ownyth/login'); // Redirect if not authenticated
      navigate("/ownyth/dashboard"); // Redirect after successful login
      return;
    }

    // Fetch waitlist data from PHP backend
    const fetchWaitlist = async () => {
      //console.log("Fetching waitlist...");
      try {
        const response = await fetch("/ownyth/server/getWaitlist.php");
        const text = await response.text();
        //console.log("Raw Response:", text);

        try {
          const result = JSON.parse(text);
          if (result.success && result.entries) {
            setEntries(result.entries); 
            setTotalEntries(result.entries.length);
          } else {
            console.error("Unexpected response structure:", result);
          }
          return result.success;
        } catch (jsonError) {
          console.error("Invalid JSON received from server:", text);
          return false;
        }
      } catch (error) {
        console.error("Failed to fetch waitlist:", error);
      }
    };

    fetchWaitlist();
  }, [isAuthenticated, setLocation]);

  const handleLogout = () => {
    setLocation('/ownyth/login');
    navigate("/ownyth/admin");
    logout();
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this signup?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`/ownyth/server/deleteUser.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      const result = await response.json();
      if (result.success) {
        setEntries(entries.filter(entry => entry.id !== id)); // Remove from UI
        setTotalEntries(prev => prev - 1);
        alert("Signup deleted successfully!");
      } else {
        alert("Error deleting signup: " + result.error);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete signup.");
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, make API call to add
    const newEntry: WaitlistEntry = {
      id: Date.now(),
      email: newEmail,
      full_name: newName,
      date_added: new Date().toISOString(),
      source: newSource,
    };
    setEntries([newEntry, ...entries]);
    setTotalEntries(prev => prev + 1);
    setNewEmail('');
    setNewName('');
    setNewSource('Admin');
  };

  const paginatedEntries = entries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#1C1C1E] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#F3F3F4]">Waitlist Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="bg-[#262627] rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl text-[#F3F3F4] font-semibold mb-4">Add New Entry</h2>
          <form onSubmit={handleAdd} className="flex gap-4" >
            <Input
              className='bg-[#262627] text-[#F3F3F4] border-[#F3F3F4]'
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <Input
              className='bg-[#262627] text-[#F3F3F4] border-[#F3F3F4]'
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <Button type="submit">Add Entry</Button>
          </form>
        </div>

        <div className="bg-[#262627] rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold  text-[#F3F3F4]" >
              Waitlist Entries ({totalEntries} total)
            </h2>
          </div>
          
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="bg-[#262627]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F3F3F4] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F3F3F4] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F3F3F4] uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F3F3F4] uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#F3F3F4] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#262627] divide-y divide-gray-200">
                {paginatedEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-[#F3F3F4]">{entry.full_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#F3F3F4]">{entry.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#F3F3F4]">
                      {new Date(entry.date_added).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#F3F3F4]">{entry.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center  text-[#F3F3F4]">
              <div>
                Page {currentPage} of {Math.ceil(totalEntries / ITEMS_PER_PAGE)}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage >= Math.ceil(totalEntries / ITEMS_PER_PAGE)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}