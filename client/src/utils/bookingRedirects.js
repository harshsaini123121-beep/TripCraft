export const getBookingURL = (mode, source, destination) => {
  const dest = encodeURIComponent(destination);
  const src = encodeURIComponent(source);
  const destSlug = destination.toLowerCase().replace(/\s+/g, '-');
  const srcSlug = source.toLowerCase().replace(/\s+/g, '-');

  const redirects = {
    bus: `https://www.redbus.in/bus-tickets/${srcSlug}-to-${destSlug}`,
    train: `https://www.railyatri.in/trains-between-stations?from_city=${src}&to_city=${dest}`,
    flight: `https://www.makemytrip.com/flights/domestic/results?tripType=O&itinerary=${src}-${dest}-${getTodayStr()}&paxType=A-1_C-0_I-0&cabinClass=E&sTime=1&forwardFlowRequired=true`,
    hotel: `https://www.makemytrip.com/hotels/hotel-listing/?city=${dest}&checkin=${getTodayStr()}&checkout=${getCheckoutStr()}&roomCount=1&adultsCount=2&childCount=0`,
    cab: `https://www.olacabs.com/?pickup=${src}&drop=${dest}`,
  };

  return redirects[mode] || 'https://www.makemytrip.com';
};

const getTodayStr = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

const getCheckoutStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

export const platformConfig = {
  redbus: { name: 'RedBus', color: '#D84E55', bg: 'rgba(216,78,85,0.1)' },
  railyatri: { name: 'RailYatri', color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
  makemytrip: { name: 'MakeMyTrip', color: '#E8523A', bg: 'rgba(232,82,58,0.1)' },
  olacabs: { name: 'Ola Cabs', color: '#4CAF50', bg: 'rgba(76,175,80,0.1)' },
  irctc: { name: 'IRCTC', color: '#1565C0', bg: 'rgba(21,101,192,0.1)' },
};

export const transportIcons = {
  bus: '🚌',
  train: '🚂',
  flight: '✈️',
  cab: '🚖',
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
