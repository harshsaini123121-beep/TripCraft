export default function ItineraryTab({ itinerary }) {
  if (!itinerary?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No itinerary available.</p>;

  const dayColors = ['#C9A84C', '#63B3ED', '#68D391', '#FC8181', '#B794F4', '#F6AD55', '#4FD1C5'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {itinerary.map((day, idx) => (
        <div key={day.day} style={{ display: 'flex', gap: 0, position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20, flexShrink: 0, paddingTop: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${dayColors[idx % dayColors.length]}18`, border: `2px solid ${dayColors[idx % dayColors.length]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: dayColors[idx % dayColors.length], flexShrink: 0, zIndex: 1 }}>
              {day.day}
            </div>
            {idx < itinerary.length - 1 && (
              <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 24, margin: '4px 0' }} />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, paddingBottom: 28 }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: dayColors[idx % dayColors.length] }}>Day {day.day}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{day.title}</h3>
            {day.theme && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: `${dayColors[idx % dayColors.length]}18`, color: dayColors[idx % dayColors.length], fontWeight: 600, display: 'inline-block', marginBottom: 14 }}>{day.theme}</span>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {day.activities?.map((activity, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                  <span style={{ flexShrink: 0, color: dayColors[idx % dayColors.length], fontSize: 16 }}>◆</span>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
