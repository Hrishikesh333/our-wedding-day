"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Wish {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching wishes:", error);
    else setWishes(data || []);
  };

  const verifyAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mysecretwedding2026') { 
      setIsAuthenticated(true);
      fetchWishes();
    } else {
      alert("Incorrect password!");
    }
  };

  const deleteWish = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    
    setIsDeleting(id);
    const { error } = await supabase
      .from('wishes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting wish:", error);
      alert("Failed to delete wish.");
    } else {
      setWishes(wishes.filter(w => w.id !== id));
    }
    setIsDeleting(null);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const latestGuestName = wishes.length > 0 ? wishes[0].guest_name : 'hyy'; // Default matched to image

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        background: `url('/assets/wallpaper.png') repeat`,
        backgroundSize: '400px',
        padding: '2rem'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '430px',
          background: '#fffcf8', 
          padding: '4rem 3rem', 
          borderRadius: '10px', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)', 
          textAlign: 'center',
          position: 'relative',
          border: '1px solid #e8dbcc'
        }}>
          <img src="/assets/seal.png" alt="Seal" style={{ width: '80px', marginBottom: '2rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#5d2a18', marginBottom: '1rem' }}>Admin Access</h2>
          <form onSubmit={verifyAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '1.2rem', borderRadius: '5px', border: '1px solid #e8dbcc', textAlign: 'center' }}
            />
            <button type="submit" style={{ padding: '1.2rem', background: '#5d2a18', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 700 }}>VERIFY</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `url('/assets/wallpaper.png') repeat`,
      backgroundSize: '400px',
      paddingBottom: '5rem',
      fontFamily: 'serif',
      color: '#333'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Great+Vibes&family=Playfair+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&display=swap');
        
        .torn-paper {
          background: #fffcf8;
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
          position: relative;
          padding: 2.5rem;
          clip-path: polygon(
            0% 2%, 3% 0%, 7% 1%, 12% 0%, 18% 2%, 25% 1%, 32% 0%, 38% 1%, 45% 0%, 52% 2%, 60% 1%, 68% 0%, 75% 1%, 82% 0%, 90% 2%, 96% 1%, 100% 0%, 100% 98%, 97% 100%, 92% 99%, 85% 100%, 78% 98%, 70% 100%, 62% 99%, 55% 100%, 48% 98%, 40% 100%, 32% 99%, 25% 100%, 18% 98%, 10% 100%, 4% 99%, 0% 100%
          );
        }

        .verified-pouch {
          background: url("data:image/svg+xml,%3Csvg width='180' height='45' viewBox='0 0 180 45' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0 L170 0 L180 22 L170 45 L10 45 L0 22 Z' fill='%235d2a18'/%3E%3Cpath d='M5 22 L175 22' stroke='%23c0704a' stroke-dasharray='4'/%3E%3C/svg%3E") no-repeat center;
          background-size: 100% 100%;
          padding: 8px 25px;
          display: flex;
          align-items: center;
          color: #fff;
          font-family: var(--font-classic);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          gap: 10px;
        }

        .discard-mahogany {
          background: url("data:image/svg+xml,%3Csvg width='160' height='50' viewBox='0 0 160 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0 L145 0 Q160 0 160 25 Q160 50 145 50 L15 50 Q0 50 0 25 Q0 0 15 0 Z' fill='%235d2a18'/%3E%3Cellipse cx='5' cy='25' rx='3' ry='8' fill='%23c0704a'/%3E%3Cellipse cx='155' cy='25' rx='3' ry='8' fill='%23c0704a'/%3E%3C/svg%3E") no-repeat center;
          background-size: contain;
          color: #fff;
          border: none;
          padding: 10px 35px;
          font-family: var(--font-classic);
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s;
        }

        .discard-mahogany:hover {
          transform: scale(1.05);
        }

        .secure-logout-fancy {
          background: url("data:image/svg+xml,%3Csvg width='180' height='60' viewBox='0 0 180 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 5 L170 5 Q180 5 180 30 Q180 55 170 55 L10 55 Q0 55 0 30 Q0 5 10 5 Z' fill='%235d2a18'/%3E%3Cpath d='M20 15 L160 15' stroke='%23c0704a' stroke-width='0.5'/%3E%3Cpath d='M20 45 L160 45' stroke='%23c0704a' stroke-width='0.5'/%3E%3C/svg%3E") no-repeat center;
          background-size: contain;
          color: #eee9e0;
          border: none;
          padding: 1rem 2.5rem;
          font-family: var(--font-classic);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }
      `}</style>

      {/* Hero Bar */}
      <div style={{ 
        background: '#fdfaf5', 
        borderBottom: '2px solid #e8dbcc', 
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/assets/seal.png" alt="Seal" style={{ width: '60px' }} />
            <div>
              <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.8rem', color: '#5d2a18', margin: 0, lineHeight: 1 }}>Amina & Yasar</h1>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '0.75rem', color: '#c0704a', margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>GUEST WISHES PORTAL</p>
            </div>
          </div>
          <button onClick={logout} className="secure-logout-fancy">
            Secure Logout
          </button>
        </div>
      </div>

      <main style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          <div className="torn-paper" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <img src="/assets/jar.png" alt="Jar" style={{ width: '100px' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '0.85rem', color: '#666', letterSpacing: '0.1em' }}>TOTAL WISHES</p>
              <h3 style={{ fontSize: '4.5rem', margin: 0, color: '#333', fontWeight: 400 }}>{wishes.length}</h3>
            </div>
          </div>
          
          <div className="torn-paper" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <img src="/assets/brooch.png" alt="Brooch" style={{ width: '90px' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '0.85rem', color: '#666', letterSpacing: '0.1em' }}>NEWEST GUEST</p>
              <h3 style={{ fontSize: '2.8rem', margin: 0, color: '#5d2a18', fontFamily: 'Great Vibes, cursive' }}>{latestGuestName}</h3>
            </div>
          </div>
        </div>

        {/* Wishes Grid */}
        <div style={{ position: 'relative' }}>
          {/* Petals */}
          <img src="/assets/petals.png" style={{ position: 'absolute', top: '-100px', right: '10%', width: '350px', opacity: 0.8, pointerEvents: 'none' }} />
          <img src="/assets/petals.png" style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '250px', transform: 'rotate(-40deg)', opacity: 0.6, pointerEvents: 'none' }} />

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))', 
            gap: '4rem',
            position: 'relative',
            zIndex: 1
          }}>
            {wishes.map((wish) => (
              <div key={wish.id} style={{ 
                background: '#fffcf8', 
                border: '1px solid #e8dbcc', 
                padding: '4rem 3rem', 
                boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                borderRadius: '8px',
                position: 'relative'
              }}>
                {/* Lace ornament */}
                <div style={{ 
                  position: 'absolute', 
                  top: '90px', 
                  left: '40px', 
                  width: '180px', 
                  height: '20px', 
                  background: 'url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q10 0 20 20 Q30 0 40 20' stroke='%23e8dbcc' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")' 
                }} />

                {/* Verified Badge */}
                <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
                  <div className="verified-pouch">
                    Verified Guest <img src="/assets/seal.png" style={{ width: '20px', filter: 'brightness(2)' }} alt="" />
                  </div>
                </div>

                <div style={{ position: 'absolute', top: '45px', right: '45px', opacity: 0.4, fontSize: '2rem' }}>✉️</div>

                <div style={{ marginTop: '5rem' }}>
                  <h4 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '4.5rem', color: '#5d2a18', margin: '0 0 0.5rem 0' }}>{wish.guest_name}</h4>
                  <p style={{ 
                    fontSize: '1.6rem', 
                    lineHeight: '1.6', 
                    color: '#333', 
                    fontStyle: 'italic', 
                    marginBottom: '3rem',
                    fontFamily: 'Cormorant Garamond, serif'
                  }}>
                    {wish.message}
                  </p>
                </div>

                {/* Dotted Line */}
                <div style={{ borderBottom: '2px dotted #e8dbcc', marginBottom: '2.5rem' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#8b5a2b', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📅 <span style={{ fontWeight: 600 }}>{new Date(wish.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  <button onClick={() => deleteWish(wish.id)} className="discard-mahogany">
                    Discard 🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '5rem', opacity: 0.2 }}>
        <p style={{ letterSpacing: '0.4em', fontSize: '0.8rem' }}>THE DIGITAL YES LUXURY SUITE</p>
      </footer>
    </div>
  );
}
