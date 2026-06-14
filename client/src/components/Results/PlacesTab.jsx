import { Star, Clock, Ticket } from 'lucide-react';

const categoryEmoji = {
  'Heritage': '🏰', 'Temple': '🛕', 'Beach': '🏖️', 'Mountain': '🏔️', 'Market': '🛍️',
  'Museum': '🏛️', 'Park': '🌳', 'Lake': '🏞️', 'Fort': '🏯', 'Garden': '🌺',
  'Wildlife': '🦁', 'Waterfall': '💧', 'Palace': '👑', 'Church': '⛪', 'Mosque': '🕌',
};

export default function PlacesTab({ places }) {
  if (!places?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No places data available.</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
        🗺️ Top {places.length} must-visit places — curated by AI based on popularity and traveller ratings.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {places.map((place, idx) => {
          const emoji = categoryEmoji[place.category] || '📍';
          const colors = ['#C9A84C', '#63B3ED', '#68D391', '#FC8181', '#B794F4', '#F6AD55', '#4FD1C5', '#FBB6CE', '#90CDF4', '#F6E05E'];
          const color = colors[idx % colors.length];

          return (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: '22px', overflow: 'hidden', position: 'relative', transition: 'all 0.3s ease', animation: `fadeIn 0.4s ${idx * 0.05}s ease both`, opacity: 0 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.boxShadow = `0 12px 32px ${color}12`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
            >
              {/* Rank badge */}
              <div style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: color }}>
                {idx + 1}
              </div>

              {/* Must-see badge */}
              {place.mustSee && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 20, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', fontSize: 10, color: 'var(--gold)', fontWeight: 700, marginBottom: 10, letterSpacing: '0.06em' }}>
                  ⭐ MUST VISIT
                </div>
              )}

              <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {emoji}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 2, color: 'var(--cream)', lineHeight: 1.3 }}>{place.name}</h3>
                  {place.category && (
                    <span style={{ fontSize: 11, color: color, fontWeight: 600 }}>{place.category}</span>
                  )}
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14 }}>{place.description}</p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {place.entryFee && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', padding: '4px 10px', borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Ticket size={11} /> {place.entryFee}
                  </div>
                )}
                {place.bestTime && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', padding: '4px 10px', borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Clock size={11} /> {place.bestTime}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}
