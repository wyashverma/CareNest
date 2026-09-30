import { useMemo, useState, type FormEvent } from 'react';
import { LocateFixed, MapPin, ChevronDown } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { popularCities } from '@/data/locations';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useToast } from '@/hooks/useToast';

/**
 * Location picker (MOCK): city list, pincode entry and "use current location".
 * "Current location" does not call the browser geolocation API yet. When a real
 * backend exists, request permission only inside that button's click handler.
 */
export function LocationSelector({ align = 'left' }: { align?: 'left' | 'right' }) {
  const { location, setLocation } = useUserLocation();
  const { showToast } = useToast();
  const [cityQuery, setCityQuery] = useState('');
  const [pincode, setPincode] = useState('');
  const [pinError, setPinError] = useState('');

  const cities = useMemo(
    () => popularCities.filter((c) => c.toLowerCase().includes(cityQuery.trim().toLowerCase())),
    [cityQuery],
  );

  const submitPincode = (e: FormEvent, close: () => void) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPinError('Enter a valid 6-digit pincode.');
      return;
    }
    setPinError('');
    setLocation({ label: `PIN ${pincode}`, pincode, source: 'pincode' });
    showToast(`Location set to PIN ${pincode}`, 'success');
    close();
  };

  return (
    <Dropdown
      label={`Change location. Current: ${location?.label ?? 'not set'}`}
      align={align}
      triggerClassName="h-11 px-3 text-sm font-medium text-ink"
      panelClassName="w-[22rem] p-4"
      trigger={
        <>
          <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
          <span className="max-w-[9rem] truncate">{location?.label ?? 'Select location'}</span>
          <ChevronDown className="h-4 w-4 text-muted" aria-hidden="true" />
        </>
      }
    >
      {(close) => (
        <div>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setLocation({ label: 'Current location (demo)', source: 'current' });
              showToast('Demo location applied. No device location was used.', 'info');
              close();
            }}
          >
            <LocateFixed className="h-4 w-4" aria-hidden="true" />
            Use current location
          </Button>

          <form onSubmit={(e) => submitPincode(e, close)} className="mt-4" noValidate>
            <label htmlFor="pincode-input" className="text-sm font-medium">
              Enter pincode
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="pincode-input"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                aria-invalid={pinError ? true : undefined}
                aria-describedby={pinError ? 'pincode-error' : undefined}
                className="h-10 min-w-0 flex-1 rounded-md border border-line px-3 text-sm"
                placeholder="e.g. 400001"
              />
              <Button type="submit" size="sm" className="h-10">
                Apply
              </Button>
            </div>
            {pinError && (
              <p id="pincode-error" className="mt-1 text-sm text-danger">
                {pinError}
              </p>
            )}
          </form>

          <div className="mt-4">
            <label htmlFor="city-input" className="text-sm font-medium">
              Or choose a city
            </label>
            <input
              id="city-input"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              placeholder="Search city"
              className="mt-1 h-10 w-full rounded-md border border-line px-3 text-sm"
            />
            <ul className="mt-2 grid max-h-40 grid-cols-2 gap-1 overflow-y-auto">
              {cities.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation({ label: city, city, source: 'city' });
                      close();
                    }}
                    aria-pressed={location?.city === city}
                    className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-surface aria-pressed:bg-brand-50 aria-pressed:font-medium aria-pressed:text-brand-700"
                  >
                    {city}
                  </button>
                </li>
              ))}
              {cities.length === 0 && <li className="col-span-2 px-2 py-1.5 text-sm text-muted">No matching city.</li>}
            </ul>
          </div>
        </div>
      )}
    </Dropdown>
  );
}
