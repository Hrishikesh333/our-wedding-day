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

  const latestGuestName = wishes.length > 0 ? wishes[0].guest_name : 'No Activity';

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
          maxWidth: '450px',
          background: '#fffcf8', 
          padding: '4rem 3rem', 
          borderRadius: '1.5rem', 
          boxShadow: '0 30px 60px rgba(93, 42, 24, 0.2)', 
          textAlign: 'center',
          position: 'relative',
          border: '1px solid #e8dbcc'
        }}>
          <img src="/assets/seal.png" alt="Seal" style={{ width: '80px', marginBottom: '1.5rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#5d2a18', marginBottom: '0.5rem' }}>Admin Access</h2>
          <p style={{ fontFamily: 'var(--font-classic)', color: '#c0704a', marginBottom: '3rem', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Secure Gateway</p>
          <form onSubmit={verifyAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input 
              type="password" 
              placeholder="Enter Access Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '1.2rem', borderRadius: '8px', border: '1px solid #e8dbcc', textAlign: 'center', outline: 'none' }}
            />
            <button type="submit" style={{ padding: '1.2rem', background: '#5d2a18', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-classic)', fontWeight: 700 }}>LOGIN</button>
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
      fontFamily: 'var(--font-body)',
      color: '#333'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Great+Vibes&family=Cinzel:wght@400;700&family=Playfair+Display:ital@0;1&display=swap');
        
        .torn-paper-edge {
          background: #fffcf8;
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          clip-path: url(#torn-path);
        }

        .torn-paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .ornate-header {
          background: #fdfaf5;
          border-bottom: 3px solid #e8dbcc;
          padding: 1rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .verified-badge-bronze {
          background: #8b5a2b;
          background: linear-gradient(135deg, #a06e3d 0%, #5d3a1a 100%);
          padding: 0.5rem 1.2rem;
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          border: 1px solid #c0704a;
        }

        .verified-badge-bronze::after {
          content: '👑';
          font-size: 0.8rem;
        }

        .ornamental-btn {
          background: #5d2a18;
          background: linear-gradient(180deg, #7a3a22 0%, #3a1a0a 100%);
          color: #eee9e0;
          border: 1px solid #8b5a2b;
          border-radius: 5px;
          padding: 0.6rem 2rem;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 0.8rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
        }

        .ornamental-btn:hover {
          filter: brightness(1.2);
          transform: translateY(-1px);
        }

        .lace-edge {
          height: 15px;
          width: 100%;
          background: url("data:image/svg+xml,%3Csvg width='40' height='15' viewBox='0 0 40 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15 Q5 0 10 15 L20 15 Q25 0 30 15 L40 15' fill='none' stroke='%23e8dbcc' stroke-width='1.5'/%3E%3C/svg%3E") repeat-x;
          opacity: 0.7;
        }
      `}</style>

      {/* SVG Path Definition for Torn Paper */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="torn-path" clipPathUnits="objectBoundingBox">
            <path d="M0,0.02 C0.05,0 0.1,0.03 0.15,0.01 C0.2,0 0.25,0.02 0.3,0 C0.35,0.01 0.4,0 0.45,0.02 C0.5,0.01 0.55,0 0.6,0.03 C0.65,0.01 0.7,0 0.75,0.02 C0.8,0.01 0.85,0 0.9,0.03 C0.95,0.01 1,0.02 1,0.02 L1,0.98 C1,0.98 0.95,1 0.9,0.98 C0.85,1 0.8,0.97 0.75,0.99 C0.7,1 0.65,0.98 0.6,1 L0.5,0.99 C0.45,1 0.4,0.98 0.35,1 C0.3,0.98 0.25,1 0.2,0.97 C0.15,0.99 0.1,1 0.05,0.98 C0,1 0,0.98 0,0.98 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Header */}
      <div className="ornate-header">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img src="/assets/seal.png" alt="Seal" style={{ width: '55px', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))' }} />
            <div>
              <h1 style={{ fontStyle: 'italic', fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', color: '#5d2a18', margin: 0 }}>Amina & Yasar</h1>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', color: '#8b5a2b', letterSpacing: '0.2em', margin: 0, fontWeight: 700 }}>GUEST WISHES PORTAL</p>
            </div>
          </div>
          <button onClick={logout} className="ornamental-btn">
             SECURE LOGOUT
          </button>
        </div>
      </div>

      <main style={{ maxWidth: '1280px', margin: '3rem auto', padding: '0 2rem' }}>
        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          <div className="torn-paper-edge torn-paper-texture" style={{ display: 'flex', alignItems: 'center', padding: '2.5rem', gap: '3rem' }}>
            <img src="/assets/jar.png" alt="Jar" style={{ width: '90px', filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.1))' }} />
            <div>
              <p style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, opacity: 0.6, fontSize: '0.8rem', letterSpacing: '0.1em' }}>TOTAL WISHES</p>
              <h3 style={{ fontSize: '3.5rem', margin: 0, color: '#5d2a18', fontFamily: 'Cinzel, serif' }}>{wishes.length}</h3>
            </div>
          </div>
          
          <div className="torn-paper-edge torn-paper-texture" style={{ display: 'flex', alignItems: 'center', padding: '2.5rem', gap: '3rem' }}>
            <img src="/assets/brooch.png" alt="Brooch" style={{ width: '85px', filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.1))' }} />
            <div>
              <p style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, opacity: 0.6, fontSize: '0.8rem', letterSpacing: '0.1em' }}>NEWEST GUEST</p>
              <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#5d2a18', fontFamily: 'Great Vibes, cursive' }}>{latestGuestName}</h3>
            </div>
          </div>
        </div>

        {/* Wishes Grid */}
        <div style={{ position: 'relative' }}>
          {/* Petals scattered */}
          <img src="/assets/petals.png" style={{ position: 'absolute', top: '-120px', right: '50px', width: '300px', opacity: 0.8, pointerEvents: 'none', zIndex: 0 }} />
          <img src="/assets/petals.png" style={{ position: 'absolute', bottom: '-80px', left: '0px', width: '250px', transform: 'rotate(-45deg)', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', 
            gap: '4rem',
            position: 'relative',
            zIndex: 1
          }}>
            {wishes.map((wish) => (
              <div key={wish.id} style={{ 
                background: '#fffcf8', 
                border: '1px solid #e8dbcc', 
                padding: '3rem 2.5rem', 
                boxShadow: '0 20px 50px rgba(93, 42, 24, 0.1)',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'visible'
              }}>
                {/* Decorative lace at top edge */}
                <div style={{ position: 'absolute', top: '75px', left: '30px', width: '150px' }} className="lace-edge" />

                {/* Verified Badge */}
                <div style={{ position: 'absolute', top: '30px', left: '30px' }}>
                  <div className="verified-badge-bronze">
                    Verified Guest
                  </div>
                </div>

                <div style={{ position: 'absolute', top: '35px', right: '35px', opacity: 0.3, fontSize: '1.8rem' }}>✉️</div>

                <div style={{ marginTop: '4rem' }}>
                  <h4 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3.8rem', color: '#5d2a18', margin: '0 0 1rem 0', lineHeight: 1 }}>{wish.guest_name}</h4>
                  <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#3a1a0a', fontStyle: 'italic', marginBottom: '2.5rem', fontFamily: 'var(--font-body)' }}>{wish.message}</p>
                </div>

                <div style={{ height: '1.5px', background: 'linear-gradient(to right, transparent, #e8dbcc 20%, #e8dbcc 80%, transparent)', margin: '2rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: '#8b5a2b', fontWeight: 700 }}>
                    📅 {new Date(wish.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  
                  <button 
                    onClick={() => deleteWish(wish.id)}
                    className="ornamental-btn"
                    style={{ padding: '0.6rem 2rem' }}
                  >
                    DISCARD 🗑️
                  </button>
                </div>
              </div>
            ))}

            {wishes.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '10rem 0', opacity: 0.4 }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem' }}>Waiting for the first scroll...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '8rem', textAlign: 'center', padding: '5rem', opacity: 0.3 }}>
        <p style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.4em', fontSize: '0.75rem', fontWeight: 700 }}>
          THE DIGITAL YES • LUXURY ADMIN INTERFACE • MMXXVI
        </p>
      </footer>
    </div>
  );
}
