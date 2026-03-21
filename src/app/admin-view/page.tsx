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

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        background: `url('/assets/wallpaper.png') repeat`,
        backgroundSize: '400px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Paper grain overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(253, 250, 245, 0.4)', 
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }} />
        
        <div style={{ 
          width: '100%',
          maxWidth: '450px',
          background: '#fffcf8', 
          padding: '4rem 3rem', 
          borderRadius: '1.5rem', 
          boxShadow: '0 30px 60px rgba(93, 42, 24, 0.15), inset 0 0 100px rgba(93, 42, 24, 0.05)', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          border: '1px solid #e8dbcc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Decorative Corner Ornaments */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #c0704a', borderLeft: '2px solid #c0704a', opacity: 0.2 }} />
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #c0704a', borderRight: '2px solid #c0704a', opacity: 0.2 }} />

          <img src="/assets/seal.png" alt="Seal" style={{ width: '80px', marginBottom: '2rem', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }} />
          
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '3.5rem', 
            marginBottom: '0.5rem', 
            color: '#5d2a18'
          }}>Admin Portal</h2>
          <p style={{ 
            fontFamily: 'var(--font-classic)', 
            color: '#c0704a', 
            marginBottom: '3rem',
            fontSize: '0.9rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700
          }}>Exclusive Management Access</p>
          
          <form onSubmit={verifyAdmin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input 
              type="password" 
              placeholder="Enter Secure Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                padding: '1.2rem', 
                width: '100%', 
                borderRadius: '8px', 
                border: '1px solid #e8dbcc', 
                fontSize: '1rem',
                outline: 'none',
                background: '#fff',
                color: '#3a1a0a',
                textAlign: 'center',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                boxSizing: 'border-box'
              }}
            />
            <button 
              type="submit" 
              style={{ 
                padding: '1.2rem', 
                width: '100%',
                background: 'linear-gradient(135deg, #c0704a, #5d2a18)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontFamily: 'var(--font-classic)',
                fontWeight: 700,
                boxShadow: '0 10px 25px rgba(93, 42, 24, 0.2)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const latestGuestName = wishes.length > 0 ? wishes[0].guest_name : 'No guests yet';

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
        @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        .torn-paper {
          background: #fffcf8;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
          clip-path: polygon(
            0% 1%, 5% 0%, 10% 2%, 15% 1%, 20% 0%, 25% 1%, 30% 0%, 35% 2%, 40% 1%, 45% 0%, 50% 1%, 55% 0%, 60% 2%, 65% 1%, 70% 0%, 75% 1%, 80% 0%, 85% 2%, 90% 1%, 95% 0%, 100% 1%,
            100% 99%, 95% 100%, 90% 98%, 85% 99%, 80% 100%, 75% 99%, 70% 98%, 65% 99%, 60% 100%, 55% 99%, 50% 98%, 45% 99%, 40% 100%, 35% 99%, 30% 98%, 25% 99%, 20% 100%, 15% 99%, 10% 98%, 5% 99%, 0% 100%
          );
          padding: 2.5rem;
          border: 1px solid rgba(232, 219, 204, 0.4);
        }

        .ornate-card {
          background: #fffdfa;
          border: 1px solid #e8dbcc;
          position: relative;
          padding: 3rem 2.5rem;
          border-radius: 4px;
          box-shadow: 0 20px 50px rgba(93, 42, 24, 0.08);
        }

        .guest-name {
          font-family: 'Great Vibes', cursive;
          font-size: 3.2rem;
          color: #5d2a18;
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }

        .discard-btn {
          background: transparent;
          position: relative;
          padding: 0.8rem 2.5rem;
          border: none;
          cursor: pointer;
          color: #fff;
          font-family: var(--font-classic);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 1;
        }

        .discard-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #5d2a18;
          z-index: -1;
          clip-path: polygon(
            15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%
          );
          border: 1px solid #c0704a;
          transition: transform 0.2s;
        }

        .discard-btn:hover::before {
          transform: scale(1.05);
          background: #3a1a0a;
        }

        .verified-badge {
          position: absolute;
          top: -15px;
          left: 20px;
          background: rgba(93, 42, 24, 0.9);
          padding: 5px 15px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border: 1px solid #c0704a;
        }
      `}</style>

      {/* Hero Header */}
      <div style={{ background: '#fffcf8', borderBottom: '1px solid #e8dbcc', padding: '1.5rem 0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img src="/assets/seal.png" alt="Seal" style={{ width: '50px' }} />
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#5d2a18', lineHeight: 1 }}>Amina & Yasar</h1>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>GUEST WISHES PORTAL</p>
            </div>
          </div>
          <button 
            onClick={logout}
            style={{ 
              background: '#fff',
              padding: '0.7rem 1.8rem',
              border: '1.5px solid #5d2a18',
              borderRadius: '8px',
              fontFamily: 'var(--font-classic)',
              color: '#5d2a18',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#5d2a18'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#5d2a18'; }}
          >
            Secure Logout
          </button>
        </div>
      </div>

      <main style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          <div className="torn-paper" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <img src="/assets/jar.png" alt="Jar" style={{ width: '85px', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.6, fontWeight: 700 }}>TOTAL WISHES</p>
              <h3 style={{ fontSize: '3.2rem', color: '#5d2a18', fontFamily: 'var(--font-classic)', margin: 0 }}>{wishes.length}</h3>
            </div>
          </div>
          
          <div className="torn-paper" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <img src="/assets/brooch.png" alt="Brooch" style={{ width: '75px', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.6, fontWeight: 700 }}>NEWEST GUEST</p>
              <h3 style={{ fontSize: '1.8rem', color: '#5d2a18', fontFamily: 'var(--font-display)', textTransform: 'capitalize', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{latestGuestName}</h3>
            </div>
          </div>
        </div>

        {/* Wishes Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', 
          gap: '3.5rem',
          position: 'relative'
        }}>
          {/* Scattered Petals Overlay */}
          <img src="/assets/petals.png" style={{ position: 'absolute', width: '300px', top: '-150px', right: '-80px', transform: 'rotate(15deg)', opacity: 0.7, pointerEvents: 'none', zIndex: -1 }} />
          <img src="/assets/petals.png" style={{ position: 'absolute', width: '250px', bottom: '-80px', left: '-100px', transform: 'rotate(-30deg) scaleX(-1)', opacity: 0.6, pointerEvents: 'none', zIndex: -1 }} />

          {wishes.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '8rem 0', background: 'rgba(255,255,255,0.4)', borderRadius: '1.5rem', border: '1px dashed #e8dbcc' }}>
              <p style={{ fontFamily: 'var(--font-classic)', fontSize: '1.5rem', opacity: 0.4 }}>Your scroll jar is empty. Waiting for guests...</p>
            </div>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className="ornate-card" style={{ opacity: isDeleting === wish.id ? 0.6 : 1 }}>
                {/* Verified Badge */}
                <div className="verified-badge">
                   <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-classic)', letterSpacing: '0.05em' }}>Verified Guest</span>
                  <span style={{ fontSize: '0.9rem' }}>👑</span>
                </div>

                <div style={{ position: 'absolute', top: '25px', right: '25px', opacity: 0.3, fontSize: '1.5rem' }}>✉️</div>

                <h4 className="guest-name">{wish.guest_name}</h4>
                <div style={{ height: '3px', width: '60px', background: '#c0704a', margin: '1rem 0 2rem 0', borderRadius: '2px', opacity: 0.6 }} />
                
                <p style={{ 
                  fontSize: '1.25rem', 
                  lineHeight: '1.8', 
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  marginBottom: '2.5rem', 
                  color: '#3a1a0a',
                  position: 'relative',
                  paddingLeft: '1rem'
                }}>
                  <span style={{ position: 'absolute', left: '-10px', top: '-10px', fontSize: '3rem', opacity: 0.15, color: '#5d2a18' }}>❝</span>
                  {wish.message}
                </p>

                <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #e8dbcc, transparent)', margin: '2rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c0704a', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span style={{ opacity: 0.7 }}>📅</span>
                    {new Date(wish.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  
                  <button 
                    onClick={() => deleteWish(wish.id)}
                    className="discard-btn"
                    disabled={isDeleting === wish.id}
                  >
                    <span>{isDeleting === wish.id ? 'Removing...' : 'Discard'}</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>🗑️</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '6rem', textAlign: 'center', padding: '4rem', opacity: 0.3 }}>
        <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 800 }}>
          THE DIGITAL YES • LUXURY ADMIN SUITE • 2026
        </p>
      </footer>
    </div>
  );
}
