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
        background: '#ffffff url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c0704a\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M40 40c0-10 10-20 20-20s20 10 20 20-10 20-20 20-20-10-20-20zM0 40C0 30 10 20 20 20s20 10 20 20-10 20-20 20S0 50 0 40zm40-40c0 10 10 20 20 20s20-10 20-20-10-20-20-20-20 10-20 20zM0 0c0 10 10 20 20 20s20-10 20-20-10-20-20-20S0-10 0 0z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        padding: '2rem',
        position: 'relative'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '430px',
          background: '#ffffff', 
          padding: '3.5rem 2rem', 
          borderRadius: '2.5rem', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)', 
          textAlign: 'center',
          border: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'linear-gradient(135deg, #fdfaf5, #fff)', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 20px rgba(93, 42, 24, 0.1)',
            border: '1px solid rgba(93, 42, 24, 0.05)'
          }}>🔒</div>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '3rem', 
            marginBottom: '0.5rem', 
            color: '#5d2a18' 
          }}>Admin Portal</h2>
          <p style={{ 
            fontFamily: 'var(--font-classic)', 
            color: '#5d2a18', 
            opacity: 0.6, 
            marginBottom: '3rem',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700
          }}>Exclusive Management Access</p>
          
          <form onSubmit={verifyAdmin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type="password" 
                placeholder="Enter Secure Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  padding: '1.2rem 1rem', 
                  width: '100%', 
                  borderRadius: '1.2rem', 
                  border: '1.5px solid rgba(93, 42, 24, 0.08)', 
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#3a1a0a',
                  textAlign: 'center',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c0704a';
                  e.target.style.boxShadow = '0 0 0 4px rgba(192, 112, 74, 0.1)';
                  e.target.style.background = '#fff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(93, 42, 24, 0.08)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                padding: '1.2rem 1.5rem', 
                width: '100%',
                background: 'linear-gradient(135deg, #c0704a, #5d2a18)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '1.2rem', 
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 700,
                boxShadow: '0 12px 25px rgba(93, 42, 24, 0.25)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxSizing: 'border-box'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(93, 42, 24, 0.35)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(93, 42, 24, 0.25)';
              }}
            >
              Sign In to Dashboard
            </button>
          </form>
          
          <div style={{ marginTop: '2.5rem', opacity: 0.3, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            © 2026 THE DIGITAL YES • SECURED ACCESS
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff',
      paddingBottom: '5rem',
      fontFamily: 'var(--font-classic)'
    }}>
      <style>{`
        /* Removed animations for plain white version */
      `}</style>
      {/* Top Header */}
      <header style={{ 
        padding: '1.2rem 4rem', 
        background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1.5px solid rgba(93, 42, 24, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '45px', 
            height: '45px', 
            background: 'linear-gradient(135deg, #c0704a, #5d2a18)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.2rem',
            boxShadow: '0 4px 10px rgba(93, 42, 24, 0.2)'
          }}>💌</div>
          <div>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '2rem', 
              color: '#5d2a18', 
              margin: 0,
              lineHeight: 1
            }}>Amina & Yasar</h1>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#c0704a', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Guest Wishes Portal</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          style={{ 
            padding: '0.7rem 1.4rem', 
            background: 'transparent', 
            color: '#5d2a18', 
            border: '1.5px solid rgba(93, 42, 24, 0.2)', 
            borderRadius: '0.8rem', 
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#5d2a18'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5d2a18'; }}
        >
          Secure Logout
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
        {/* Stats Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '2rem', 
            borderRadius: '1.5rem', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(93, 42, 24, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div style={{ fontSize: '2.5rem' }}>📊</div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Wishes</p>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#5d2a18', fontFamily: 'var(--font-classic)' }}>{wishes.length}</h3>
            </div>
          </div>

          <div style={{ 
            background: '#fff', 
            padding: '2rem', 
            borderRadius: '1.5rem', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(93, 42, 24, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div style={{ fontSize: '2.5rem' }}>✨</div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Newest Guest</p>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#5d2a18', fontFamily: 'var(--font-classic)' }}>{wishes[0]?.guest_name || 'No Activity'}</h3>
            </div>
          </div>
        </div>

        {/* Wishes Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {wishes.map((wish) => (
            <div 
              key={wish.id} 
              style={{ 
                background: '#fff', 
                padding: '2.5rem', 
                borderRadius: '2rem', 
                boxShadow: '0 15px 40px rgba(93, 42, 24, 0.05)', 
                border: '1px solid rgba(93, 42, 24, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                opacity: isDeleting === wish.id ? 0.5 : 1
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ 
                  background: 'rgba(192, 112, 74, 0.1)', 
                  color: '#c0704a', 
                  padding: '0.4rem 1rem', 
                  borderRadius: '2rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}>Verified Guest</span>
                <span style={{ fontSize: '1.5rem' }}>✉️</span>
              </div>
              
              <h3 style={{ 
                fontFamily: 'var(--font-classic)', 
                margin: '0 0 0.5rem 0', 
                color: '#3a1a0a', 
                fontSize: '1.4rem', 
                fontWeight: 600 
              }}>{wish.guest_name}</h3>
              
              <div style={{ 
                flexGrow: 1, 
                padding: '1.5rem 0', 
                position: 'relative'
              }}>
                <span style={{ 
                  position: 'absolute', 
                  top: '-1rem', 
                  left: '-0.5rem', 
                  fontSize: '3rem', 
                  opacity: 0.1, 
                  color: '#5d2a18',
                  userSelect: 'none'
                }}>"</span>
                <p style={{ 
                  fontFamily: 'var(--font-body)', 
                  margin: 0, 
                  color: '#3a1a0a', 
                  opacity: 0.85, 
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  fontStyle: 'italic'
                }}>{wish.message}</p>
              </div>

              <div style={{ 
                marginTop: '1.5rem', 
                paddingTop: '1.5rem', 
                borderTop: '1px dashed rgba(93, 42, 24, 0.1)',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div style={{ color: '#999', fontSize: '0.8rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>📅</span>
                  {new Date(wish.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                
                <button 
                  onClick={() => deleteWish(wish.id)}
                  disabled={isDeleting === wish.id}
                  style={{ 
                    padding: '0.6rem 1rem', 
                    background: 'rgba(255, 77, 77, 0.05)', 
                    color: '#ff4d4d', 
                    border: 'none', 
                    borderRadius: '0.8rem', 
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#ff4d4d'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 77, 77, 0.05)'; e.currentTarget.style.color = '#ff4d4d'; }}
                >
                  {isDeleting === wish.id ? 'Deleting...' : (
                    <>
                      <span>🗑️</span>
                      <span>Discard</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
          {wishes.length === 0 && (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '6rem 0',
              background: '#fff',
              borderRadius: '2rem',
              border: '1px dashed rgba(93, 42, 24, 0.2)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📭</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#5d2a18' }}>Waiting for wishes...</h3>
              <p style={{ color: '#666' }}>As guests start sending messages, they will appear here beautifully.</p>
            </div>
          )}
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.4 }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>POWERED BY THE DIGITAL YES ADMIN TOOL</p>
      </footer>
    </div>
  );
}
