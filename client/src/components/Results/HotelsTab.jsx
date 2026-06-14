import { ExternalLink, Star, Wifi, Coffee, Dumbbell, Car } from 'lucide-react';
import { formatCurrency } from '../../utils/bookingRedirects';

const amenityIcons = { 'Free WiFi': '📶', 'Breakfast': '🍳', 'Pool': '🏊', 'AC': '❄️', 'Gym': '💪', 'Parking': '🅿️', 'Restaurant': '🍽️', 'Bar': '🍹', 'Spa': '💆', 'Room Service': '🛎️' };

export default function HotelsTab({ hotels, destination }) {
  if (!hotels?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No hotel data available.</p>;

  const badges = ['Best Budget Pick', 'Most Popular', 'Premium Choice'];
  const badgeColors = ['#68D391', '#C9A84C', '#B794F4'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 8 }}>
        🏨 Compare {hotels.length} hotel options in <strong style={{ color: 'var(--cream)' }}>{destination}</strong> — sorted from budget to premium.
      </p>

      {hotels.map((hotel, idx) => (
        <div
          key={idx}
          className="glass-card"
          style={{ padding: '24px 28px', position: 'relative', overflow: 'hidden', border: idx === 1 ? '1px solid var(--border-gold)' : '1px solid var(--border)', animation: `fadeIn 0.4s ${idx * 0.1}s ease both`, opacity: 0 }}
        >
          {/* Popular badge */}
          {idx < 3 && (
            <div style={{ position: 'absolute', top: 16, right: 16, padding: '4px 10px', borderRadius: 20, background: `${badgeColors[idx]}22`, border: `1px solid ${badgeColors[idx]}55`, fontSize: 11, fontWeight: 700, color: badgeColors[idx], letterSpacing: '0.04em' }}>
              {badges[idx]}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            {/* Hotel icon */}
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              🏨
            </div>

            {/* Hotel info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, marginBottom: 4 }}>{hotel.name}</h3>
              {hotel.area && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>📍 {hotel.area}</p>}

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13} fill={s <= Math.round(hotel.rating) ? '#C9A84C' : 'none'} color={s <= Math.round(hotel.rating) ? '#C9A84C' : 'var(--border)'} />
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>{hotel.rating?.toFixed(1)}</span>
              </div>

              {/* Amenities */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {hotel.amenities?.slice(0, 6).map(a => (
                  <span key={a} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    {amenityIcons[a] || '✓'} {a}
                  </span>
                ))}
              </div>

              {hotel.highlight && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10, fontStyle: 'italic' }}>
                  ✨ {hotel.highlight}
                </p>
              )}
            </div>

            {/* Price & Book */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>per night</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--gold)' }}>{formatCurrency(hotel.pricePerNight)}</span>
              </div>
              {hotel.totalPrice && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Total: {formatCurrency(hotel.totalPrice)}</p>
              )}
              <a
                href={hotel.bookingUrl || `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ padding: '10px 18px', fontSize: 13, textDecoration: 'none', display: 'inline-flex' }}
              >
                Book on MakeMyTrip <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      ))}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
