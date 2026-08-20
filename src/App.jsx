import React, { useState } from "react";
import {
  Search, MapPin, Calendar, Clock, Heart, Star, ChevronRight, ChevronLeft,
  ChevronDown, Bell, User, Users, SlidersHorizontal, X, Check, CreditCard,
  Phone, Share2, Navigation, ShieldCheck, Car, Droplets, Lightbulb, Armchair,
  Plus, ArrowLeft, Trophy, Zap, Shirt, Moon, Sun, Globe, Home as HomeIcon,
  CalendarCheck, MapIcon, List
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const AREAS = ["Dhanmondi", "Mirpur", "Uttara", "Bashundhara", "Badda", "Mohammadpur"];

const TURFS = [
  { id: 1, name: "Arena Sports Complex", area: "Dhanmondi", distance: "2.1 km", rating: 4.8, reviews: 124, sport: "football", price: 2500, priceFrom: false, time: "8:00 PM", status: "available", verified: true, ground: "5-a-side · Outdoor",
    facilities: ["parking", "washroom", "changing", "lights", "water", "seating"],
    desc: "Arena Sports Complex is Dhanmondi's most booked evening turf, known for its bright floodlights and true-bounce artificial grass. Popular with university teams for Friday night 7v7 games and corporate 5-a-side matches after work.",
    pricing: [["Morning", "6 AM – 12 PM", 1800], ["Afternoon", "12 PM – 5 PM", 2000], ["Evening", "5 PM – 12 AM", 2800]] },
  { id: 2, name: "KickOff Arena", area: "Bashundhara", distance: "2.4 km", rating: 4.8, reviews: 98, sport: "football", price: 2000, priceFrom: true, time: "7:00 PM", status: "few", verified: true, ground: "7-a-side · Outdoor",
    facilities: ["parking", "washroom", "lights", "water"],
    desc: "A wide 7-a-side pitch near Bashundhara City, popular for weekend tournaments and after-office leagues.",
    pricing: [["Morning", "6 AM – 12 PM", 1600], ["Afternoon", "12 PM – 5 PM", 1800], ["Evening", "5 PM – 12 AM", 2400]] },
  { id: 3, name: "Green Turf Ground", area: "Uttara", distance: "5.1 km", rating: 4.6, reviews: 61, sport: "cricket", price: 1800, priceFrom: false, time: "9:00 PM", status: "available", verified: false, ground: "Practice Nets · Outdoor",
    facilities: ["parking", "washroom", "lights", "first_aid"],
    desc: "Well-maintained practice nets and a full pitch, popular with weekend cricket clubs in Uttara.",
    pricing: [["Morning", "6 AM – 12 PM", 1200], ["Afternoon", "12 PM – 5 PM", 1500], ["Evening", "5 PM – 12 AM", 2000]] },
  { id: 4, name: "Victory Ground", area: "Mirpur", distance: "3.6 km", rating: 4.5, reviews: 143, sport: "football", price: 2200, priceFrom: false, time: "6:00 PM", status: "few", verified: true, ground: "5-a-side · Indoor",
    facilities: ["parking", "changing", "lights", "seating", "first_aid"],
    desc: "Indoor 5-a-side turf with air circulation, a favourite for rainy-day bookings in Mirpur.",
    pricing: [["Morning", "6 AM – 12 PM", 1600], ["Afternoon", "12 PM – 5 PM", 1900], ["Evening", "5 PM – 12 AM", 2500]] },
  { id: 5, name: "Champions Nest", area: "Badda", distance: "1.8 km", rating: 4.7, reviews: 77, sport: "cricket", price: 2600, priceFrom: false, time: "8:00 PM", status: "available", verified: true, ground: "Full Pitch · Outdoor",
    facilities: ["parking", "washroom", "changing", "lights", "water", "seating", "first_aid"],
    desc: "Full-size cricket ground with a proper boundary rope, great for corporate tournaments.",
    pricing: [["Morning", "6 AM – 12 PM", 2000], ["Afternoon", "12 PM – 5 PM", 2200], ["Evening", "5 PM – 12 AM", 3000]] },
  { id: 6, name: "Elite Turf", area: "Mohammadpur", distance: "4.0 km", rating: 4.3, reviews: 52, sport: "football", price: 1900, priceFrom: true, time: "10:00 PM", status: "booked", verified: false, ground: "5-a-side · Outdoor",
    facilities: ["parking", "washroom", "lights"],
    desc: "Budget-friendly turf close to Mohammadpur bus stand, good for casual weekday games.",
    pricing: [["Morning", "6 AM – 12 PM", 1400], ["Afternoon", "12 PM – 5 PM", 1600], ["Evening", "5 PM – 12 AM", 2100]] },
];

const DATES = [
  { d: "THU", n: 13 }, { d: "FRI", n: 14 }, { d: "SAT", n: 15 }, { d: "SUN", n: 16 }, { d: "MON", n: 17 },
];

const SLOTS = [
  { t: "6:00 PM", price: 2500, state: "booked" },
  { t: "7:00 PM", price: 2500, state: "available" },
  { t: "8:00 PM", price: 2800, state: "available" },
  { t: "9:00 PM", price: 2800, state: "available" },
  { t: "10:00 PM", price: 2800, state: "booked" },
];

const FACILITY_META = {
  parking: { label: "Parking", Icon: Car },
  washroom: { label: "Washroom", Icon: Droplets },
  changing: { label: "Changing Room", Icon: Shirt },
  lights: { label: "Floodlights", Icon: Lightbulb },
  water: { label: "Drinking Water", Icon: Droplets },
  seating: { label: "Seating", Icon: Armchair },
  first_aid: { label: "First Aid", Icon: ShieldCheck },
};

const COPY = {
  en: { greeting: "Good Evening", where: "Where are you playing today?", searchPh: "Search turf or area", find: "Find Available Turfs", playTonight: "Play Tonight", playSub: "Available turfs near you", near: "Near You", areas: "Popular Areas", offer: "WEEKEND GAME", offerSub: "Get ৳200 off selected turfs", exploreOffer: "Explore Offer" },
  bn: { greeting: "শুভ সন্ধ্যা", where: "আজ কোথায় খেলবেন?", searchPh: "টার্ফ বা এলাকা খুঁজুন", find: "খালি টার্ফ খুঁজুন", playTonight: "আজ রাতেই খেলুন", playSub: "আপনার কাছাকাছি খালি টার্ফ", near: "কাছাকাছি", areas: "জনপ্রিয় এলাকা", offer: "উইকেন্ড গেম", offerSub: "নির্বাচিত টার্ফে ৳২০০ ছাড়", exploreOffer: "অফার দেখুন" },
};

/* ------------------------------- COMPONENTS ------------------------------- */

function TurfImage({ sport, size = "md", status }) {
  return (
    <div className={`tk-turfimg tk-turfimg-${size}`}>
      <div className="tk-turfimg-stripes" />
      <div className="tk-turfimg-glow" />
      <div className="tk-turfimg-icon">{sport === "cricket" ? "🏏" : "⚽"}</div>
      {status === "few" && <span className="tk-badge tk-badge-warn">Only Few Slots</span>}
      {status === "booked" && <span className="tk-badge tk-badge-gray">Booked</span>}
    </div>
  );
}

function RatingBadge({ rating, reviews }) {
  return (
    <span className="tk-rating">
      <Star size={12} fill="#F59E0B" color="#F59E0B" />
      {rating}{reviews ? <span className="tk-rating-count">({reviews})</span> : null}
    </span>
  );
}

function StatusPill({ status }) {
  if (status === "available") return <span className="tk-pill tk-pill-green"><span className="tk-dot" />Available</span>;
  if (status === "few") return <span className="tk-pill tk-pill-warn">Only Few Slots</span>;
  return <span className="tk-pill tk-pill-gray">Booked</span>;
}

function TurfCard({ turf, onOpen, favorites, toggleFav, compact }) {
  const isFav = favorites.includes(turf.id);
  return (
    <button className={`tk-card tk-turfcard ${compact ? "tk-turfcard-compact" : ""}`} onClick={() => onOpen(turf)}>
      <div className="tk-turfcard-media">
        <TurfImage sport={turf.sport} status={turf.status} />
        <button className={`tk-heart ${isFav ? "tk-heart-active" : ""}`} onClick={(e) => { e.stopPropagation(); toggleFav(turf.id); }}>
          <Heart size={15} fill={isFav ? "#EF4444" : "none"} color={isFav ? "#EF4444" : "#fff"} />
        </button>
        {turf.verified && <span className="tk-badge tk-badge-verified"><ShieldCheck size={11} /> Verified</span>}
      </div>
      <div className="tk-turfcard-body">
        <div className="tk-turfcard-toprow">
          <span className="tk-turfcard-name">{turf.name}</span>
          <RatingBadge rating={turf.rating} reviews={turf.reviews} />
        </div>
        <div className="tk-turfcard-meta">
          <MapPin size={12} /> {turf.area} · {turf.distance}
        </div>
        <div className="tk-turfcard-meta">
          {turf.sport === "cricket" ? "🏏 Cricket" : "⚽ Football"} · {turf.ground.split(" · ")[1] || "Outdoor"}
        </div>
        <div className="tk-turfcard-bottom">
          <StatusPill status={turf.status} />
          <span className="tk-price">{turf.priceFrom ? "From " : ""}৳{turf.price.toLocaleString()}<span className="tk-price-unit">/hr</span></span>
        </div>
      </div>
    </button>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="tk-sectionhead">
      <h3>{title}</h3>
      {action && <button className="tk-linkbtn" onClick={onAction}>{action} <ChevronRight size={14} /></button>}
    </div>
  );
}

/* ---------------------------------- HOME ---------------------------------- */

function HomeScreen({ lang, sport, setSport, favorites, toggleFav, openTurf, goExplore, setDate, setTime, date, time }) {
  const t = COPY[lang];
  const filtered = TURFS.filter((x) => x.sport === sport);
  return (
    <div className="tk-screen">
      <div className="tk-home-header">
        <div>
          <div className="tk-greeting">{t.greeting}, Farhad <span>👋</span></div>
          <button className="tk-location">
            <MapPin size={13} /> Dhanmondi, Dhaka <ChevronDown size={13} />
          </button>
        </div>
        <button className="tk-iconbtn"><Bell size={18} /><span className="tk-notifdot" /></button>
      </div>

      <h1 className="tk-hero-title">{t.where}</h1>

      <button className="tk-searchbar" onClick={goExplore}>
        <Search size={16} />
        <span>{t.searchPh}</span>
      </button>

      <div className="tk-sportrow">
        <button className={`tk-sportcard ${sport === "football" ? "tk-sportcard-active" : ""}`} onClick={() => setSport("football")}>
          <span className="tk-sport-emoji">⚽</span> Football
        </button>
        <button className={`tk-sportcard ${sport === "cricket" ? "tk-sportcard-active" : ""}`} onClick={() => setSport("cricket")}>
          <span className="tk-sport-emoji">🏏</span> Cricket
        </button>
      </div>

      <div className="tk-card tk-bookwidget">
        <div className="tk-bookwidget-row">
          <div className="tk-bookwidget-field">
            <span className="tk-bookwidget-icon">{sport === "cricket" ? "🏏" : "⚽"}</span>
            <div>
              <div className="tk-bookwidget-label">Sport</div>
              <div className="tk-bookwidget-value">{sport === "cricket" ? "Cricket" : "Football"}</div>
            </div>
          </div>
        </div>
        <div className="tk-bookwidget-grid">
          <button className="tk-bookwidget-field" onClick={() => setDate((d) => (d + 1) % DATES.length)}>
            <Calendar size={16} className="tk-accenticon" />
            <div>
              <div className="tk-bookwidget-label">Date</div>
              <div className="tk-bookwidget-value">{DATES[date].d}, Aug {DATES[date].n}</div>
            </div>
          </button>
          <button className="tk-bookwidget-field" onClick={() => setTime((v) => (v + 1) % SLOTS.length)}>
            <Clock size={16} className="tk-accenticon" />
            <div>
              <div className="tk-bookwidget-label">Time</div>
              <div className="tk-bookwidget-value">{SLOTS[time].t}</div>
            </div>
          </button>
        </div>
        <div className="tk-bookwidget-field">
          <MapPin size={16} className="tk-accenticon" />
          <div>
            <div className="tk-bookwidget-label">Location</div>
            <div className="tk-bookwidget-value">Dhanmondi</div>
          </div>
        </div>
        <button className="tk-btn-primary tk-btn-block" onClick={goExplore}>{t.find}</button>
      </div>

      <SectionHeader title={<>{t.playTonight} <span className="tk-bolt">⚡</span></>} action="See all" onAction={goExplore} />
      <p className="tk-sectionsub">{t.playSub}</p>
      <div className="tk-hscroll">
        {filtered.slice(0, 4).map((turf) => (
          <TurfCard key={turf.id} turf={turf} onOpen={openTurf} favorites={favorites} toggleFav={toggleFav} />
        ))}
      </div>

      <SectionHeader title={t.near} action="See all" onAction={goExplore} />
      <div className="tk-hscroll">
        {TURFS.slice(0, 4).map((turf) => (
          <TurfCard key={turf.id} turf={turf} onOpen={openTurf} favorites={favorites} toggleFav={toggleFav} compact />
        ))}
      </div>

      <SectionHeader title={t.areas} />
      <div className="tk-chiprow">
        {AREAS.map((a) => (
          <button key={a} className="tk-areachip" onClick={goExplore}>{a}</button>
        ))}
      </div>

      <div className="tk-promo" onClick={goExplore}>
        <div>
          <div className="tk-promo-title">{t.offer} <span className="tk-bolt">🔥</span></div>
          <div className="tk-promo-sub">{t.offerSub}</div>
        </div>
        <span className="tk-promo-cta">{t.exploreOffer} <ChevronRight size={14} /></span>
      </div>
    </div>
  );
}

/* -------------------------------- EXPLORE --------------------------------- */

function ExploreScreen({ sport, setSport, favorites, toggleFav, openTurf }) {
  const [view, setView] = useState("list");
  const results = TURFS.filter((x) => x.sport === sport);
  return (
    <div className="tk-screen">
      <div className="tk-explore-search">
        <Search size={16} />
        <span>Search turf or area</span>
      </div>
      <div className="tk-tabrow">
        <button className={`tk-tab ${sport === "football" ? "tk-tab-active" : ""}`} onClick={() => setSport("football")}>⚽ Football</button>
        <button className={`tk-tab ${sport === "cricket" ? "tk-tab-active" : ""}`} onClick={() => setSport("cricket")}>🏏 Cricket</button>
      </div>
      <div className="tk-chiprow tk-chiprow-scroll">
        {["Area", "Date", "Time", "Price", "More Filters"].map((f) => (
          <button key={f} className="tk-filterchip"><SlidersHorizontal size={12} /> {f}</button>
        ))}
      </div>
      <div className="tk-explore-toolbar">
        <span className="tk-explore-count">{results.length} Turfs Found</span>
        <div className="tk-segment">
          <button className={`tk-segment-btn ${view === "list" ? "tk-segment-active" : ""}`} onClick={() => setView("list")}><List size={13} /> List</button>
          <button className={`tk-segment-btn ${view === "map" ? "tk-segment-active" : ""}`} onClick={() => setView("map")}><MapIcon size={13} /> Map</button>
        </div>
      </div>

      {view === "list" ? (
        <div className="tk-vlist">
          {results.map((turf) => (
            <TurfCard key={turf.id} turf={turf} onOpen={openTurf} favorites={favorites} toggleFav={toggleFav} />
          ))}
        </div>
      ) : (
        <div className="tk-mapview">
          <div className="tk-mapview-grid" />
          {results.map((turf, i) => (
            <button
              key={turf.id}
              className={`tk-mappin tk-mappin-${turf.status}`}
              style={{ left: `${18 + (i * 53) % 260}px`, top: `${30 + (i * 71) % 230}px` }}
              onClick={() => openTurf(turf)}
            >
              <MapPin size={20} fill="currentColor" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------- TURF DETAILS ------------------------------ */

function TurfDetails({ turf, onBack, favorites, toggleFav, dateIdx, setDateIdx, slot, setSlot, onContinue }) {
  const [descOpen, setDescOpen] = useState(false);
  const isFav = favorites.includes(turf.id);
  const selectedSlot = slot !== null ? SLOTS[slot] : null;

  return (
    <div className="tk-screen tk-screen-nopad">
      <div className="tk-details-hero">
        <TurfImage sport={turf.sport} size="lg" />
        <div className="tk-details-hero-top">
          <button className="tk-iconbtn tk-iconbtn-glass" onClick={onBack}><ArrowLeft size={17} /></button>
          <div className="tk-hero-actions">
            <button className="tk-iconbtn tk-iconbtn-glass"><Share2 size={16} /></button>
            <button className="tk-iconbtn tk-iconbtn-glass" onClick={() => toggleFav(turf.id)}>
              <Heart size={16} fill={isFav ? "#EF4444" : "none"} color={isFav ? "#EF4444" : "#fff"} />
            </button>
          </div>
        </div>
      </div>

      <div className="tk-screen-pad">
        {turf.verified && <span className="tk-badge tk-badge-verified tk-badge-inline"><ShieldCheck size={11} /> Verified</span>}
        <h1 className="tk-details-title">{turf.name}</h1>
        <div className="tk-details-subrow">
          <RatingBadge rating={turf.rating} reviews={turf.reviews} />
          <span className="tk-dotsep">·</span>
          <span className="tk-details-meta"><MapPin size={12} /> {turf.area}, Dhaka</span>
          <span className="tk-dotsep">·</span>
          <span className="tk-details-meta">{turf.distance} away</span>
        </div>

        <div className="tk-quickactions">
          <button className="tk-quickaction"><Navigation size={16} /> Directions</button>
          <button className="tk-quickaction"><Phone size={16} /> Call Turf</button>
          <button className="tk-quickaction"><Share2 size={16} /> Share</button>
        </div>

        <div className="tk-chiprow">
          <span className="tk-sportchip">{turf.sport === "cricket" ? "🏏" : "⚽"} {turf.sport === "cricket" ? "Cricket" : "Football"}</span>
          <span className="tk-sportchip">{turf.ground}</span>
        </div>

        <SectionHeader title="Facilities" />
        <div className="tk-facilgrid">
          {turf.facilities.map((f) => {
            const meta = FACILITY_META[f];
            const Icon = meta.Icon;
            return (
              <div key={f} className="tk-facil">
                <Icon size={18} />
                <span>{meta.label}</span>
              </div>
            );
          })}
        </div>

        <SectionHeader title="About this turf" />
        <p className={`tk-desc ${descOpen ? "" : "tk-desc-clamped"}`}>{turf.desc}</p>
        <button className="tk-linkbtn tk-linkbtn-block" onClick={() => setDescOpen((v) => !v)}>{descOpen ? "Show Less" : "Read More"}</button>

        <SectionHeader title="Location" />
        <div className="tk-minimap">
          <div className="tk-mapview-grid" />
          <div className="tk-mappin tk-mappin-available" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
            <MapPin size={22} fill="currentColor" />
          </div>
        </div>
        <div className="tk-loc-row">
          <span>{turf.area}, Dhaka · {turf.distance} away</span>
          <button className="tk-linkbtn">Get Directions</button>
        </div>

        <SectionHeader title="Pricing" />
        <div className="tk-card tk-pricingtable">
          {turf.pricing.map(([label, range, price]) => (
            <div className="tk-pricerow" key={label}>
              <div>
                <div className="tk-pricerow-label">{label}</div>
                <div className="tk-pricerow-range">{range}</div>
              </div>
              <div className="tk-pricerow-value">৳{price.toLocaleString()}/hr</div>
            </div>
          ))}
        </div>

        <SectionHeader title="Choose Your Slot" />
        <div className="tk-datescroll">
          {DATES.map((d, i) => (
            <button key={i} className={`tk-datechip ${dateIdx === i ? "tk-datechip-active" : ""}`} onClick={() => setDateIdx(i)}>
              <span>{d.d}</span>
              <strong>{d.n}</strong>
            </button>
          ))}
        </div>

        <div className="tk-slotgrid">
          {SLOTS.map((s, i) => (
            <button
              key={i}
              disabled={s.state === "booked"}
              className={`tk-slot ${s.state === "booked" ? "tk-slot-booked" : ""} ${slot === i ? "tk-slot-selected" : ""}`}
              onClick={() => setSlot(i)}
            >
              <span>{s.t}</span>
              <em>৳{s.price.toLocaleString()}</em>
            </button>
          ))}
        </div>

        <div style={{ height: selectedSlot ? 90 : 24 }} />
      </div>

      {selectedSlot && (
        <div className="tk-stickycta">
          <div>
            <div className="tk-stickycta-title">{DATES[dateIdx].d} · {selectedSlot.t}–{`${(parseInt(selectedSlot.t) % 12) + 2 || 12}:00 ${selectedSlot.t.includes("PM") ? "PM" : "AM"}`}</div>
            <div className="tk-stickycta-price">৳{(selectedSlot.price * 2).toLocaleString()}</div>
          </div>
          <button className="tk-btn-primary" onClick={onContinue}>Continue</button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ BOOKING FLOW ------------------------------- */

function BookingSummary({ turf, dateIdx, slot, onBack, onPay }) {
  const s = SLOTS[slot];
  const base = s.price * 2;
  const fee = 200;
  const discount = 300;
  const total = base + fee - discount;
  return (
    <div className="tk-screen">
      <div className="tk-flowhead">
        <button className="tk-iconbtn" onClick={onBack}><ArrowLeft size={18} /></button>
        <h2>Review Booking</h2>
      </div>

      <div className="tk-card tk-summarycard">
        <div className="tk-summarycard-title">{turf.name}</div>
        <div className="tk-summarycard-row"><Calendar size={14} /> {DATES[dateIdx].d}, Aug {DATES[dateIdx].n}</div>
        <div className="tk-summarycard-row"><Clock size={14} /> {s.t} – 2 Hours</div>
        <div className="tk-summarycard-row">{turf.sport === "cricket" ? "🏏" : "⚽"} {turf.sport === "cricket" ? "Cricket" : "Football"}</div>
      </div>

      <SectionHeader title="Price Breakdown" />
      <div className="tk-card tk-pricingtable">
        <div className="tk-pricerow"><span>Turf</span><span>৳{base.toLocaleString()}</span></div>
        <div className="tk-pricerow"><span>Service fee</span><span>৳{fee}</span></div>
        <div className="tk-pricerow"><span className="tk-green-text">Discount</span><span className="tk-green-text">-৳{discount}</span></div>
        <div className="tk-pricerow tk-pricerow-total"><span>Total</span><span>৳{total.toLocaleString()}</span></div>
      </div>

      <div className="tk-promoinput">
        <input placeholder="Enter Promo Code" readOnly />
        <button>Apply</button>
      </div>

      <button className="tk-btn-primary tk-btn-block" style={{ marginTop: 20 }} onClick={() => onPay(total)}>Proceed to Payment</button>
    </div>
  );
}

function PaymentScreen({ total, onBack, onPaid }) {
  const [method, setMethod] = useState("bkash");
  const methods = [
    { id: "bkash", label: "bKash", tint: "#E2136E" },
    { id: "nagad", label: "Nagad", tint: "#F6921E" },
    { id: "card", label: "Card", tint: "#3B82F6" },
  ];
  return (
    <div className="tk-screen">
      <div className="tk-flowhead">
        <button className="tk-iconbtn" onClick={onBack}><ArrowLeft size={18} /></button>
        <h2>Choose Payment Method</h2>
      </div>

      <div className="tk-paymethods">
        {methods.map((m) => (
          <button key={m.id} className={`tk-paymethod ${method === m.id ? "tk-paymethod-active" : ""}`} onClick={() => setMethod(m.id)}>
            <span className="tk-paymethod-dot" style={{ background: m.tint }} />
            {m.label}
            {method === m.id && <Check size={16} className="tk-accenticon" />}
          </button>
        ))}
      </div>

      <div className="tk-card tk-totalcard">
        <span>Total Payable</span>
        <strong>৳{total.toLocaleString()}</strong>
      </div>

      <p className="tk-finetext"><ShieldCheck size={13} /> Secure Payment · Free cancellation up to 6 hours before your slot.</p>

      <button className="tk-btn-primary tk-btn-block" onClick={onPaid}>Pay ৳{total.toLocaleString()}</button>
    </div>
  );
}

function SuccessScreen({ turf, dateIdx, slot, onDone, goBookings }) {
  const s = SLOTS[slot];
  return (
    <div className="tk-screen tk-success">
      <div className="tk-success-check"><Check size={34} strokeWidth={3} /></div>
      <h1>You're Ready to Play! ⚽</h1>
      <p className="tk-success-sub">Booking Confirmed</p>

      <div className="tk-card tk-successcard">
        <div className="tk-summarycard-title">{turf.name}</div>
        <div className="tk-summarycard-row"><Calendar size={14} /> {DATES[dateIdx].d}, Aug {DATES[dateIdx].n}</div>
        <div className="tk-summarycard-row"><Clock size={14} /> {s.t} – 2 Hours</div>
        <div className="tk-summarycard-row"><MapPin size={14} /> {turf.area}</div>
        <div className="tk-successcard-id">Booking ID <strong>TK-240814-2849</strong></div>
      </div>

      <div className="tk-success-grid">
        <button className="tk-btn-secondary" onClick={() => { onDone(); goBookings(); }}>View Booking</button>
        <button className="tk-btn-secondary"><Navigation size={15} /> Directions</button>
        <button className="tk-btn-secondary"><Users size={15} /> Invite Players</button>
        <button className="tk-btn-secondary"><CalendarCheck size={15} /> Add to Calendar</button>
      </div>
      <button className="tk-linkbtn tk-linkbtn-block" style={{ marginTop: 18 }} onClick={onDone}>Back to Home</button>
    </div>
  );
}

/* --------------------------------- PLAY ------------------------------------ */

function PlayScreen() {
  const items = [
    { title: "Create Match", icon: "⚽", sub: "Set up a game and invite players" },
    { title: "Find Players", icon: "👥", sub: "Join games that need more players" },
    { title: "Find Opponent", icon: "🏆", sub: "Challenge a team near you" },
    { title: "My Teams", icon: "🛡️", sub: "Manage your squads" },
    { title: "Join a Match", icon: "🎯", sub: "Browse open games nearby" },
  ];
  return (
    <div className="tk-screen">
      <h1 className="tk-hero-title" style={{ marginBottom: 4 }}>Let's Play</h1>
      <p className="tk-sectionsub" style={{ marginBottom: 18 }}>Organize games, find teammates, and challenge rivals.</p>
      <div className="tk-playgrid">
        {items.map((it) => (
          <button key={it.title} className="tk-card tk-playcard">
            <span className="tk-playcard-icon">{it.icon}</span>
            <div className="tk-playcard-title">{it.title}</div>
            <div className="tk-playcard-sub">{it.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- BOOKINGS ---------------------------------- */

function BookingsScreen({ hasBooking }) {
  const [tab, setTab] = useState("upcoming");
  return (
    <div className="tk-screen">
      <h1 className="tk-hero-title" style={{ marginBottom: 14 }}>Bookings</h1>
      <div className="tk-tabrow">
        {["upcoming", "completed", "cancelled"].map((k) => (
          <button key={k} className={`tk-tab ${tab === k ? "tk-tab-active" : ""}`} onClick={() => setTab(k)}>
            {k[0].toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      {tab === "upcoming" && hasBooking ? (
        <div className="tk-card tk-bookingcard">
          <TurfImage sport="football" size="sm" />
          <div className="tk-bookingcard-body">
            <div className="tk-bookingcard-title">Arena Sports Complex</div>
            <div className="tk-summarycard-row"><Calendar size={13} /> Friday, Aug 14</div>
            <div className="tk-summarycard-row"><Clock size={13} /> 8 PM – 10 PM</div>
            <div className="tk-countdown">Game starts in 4h 20m</div>
            <div className="tk-bookingcard-actions">
              <button className="tk-btn-secondary tk-btn-sm">View Details</button>
              <button className="tk-btn-secondary tk-btn-sm"><Navigation size={13} /> Directions</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="tk-empty">
          <div className="tk-empty-illus">🌙⚽</div>
          <div className="tk-empty-title">No {tab === "upcoming" ? "Upcoming Games" : tab === "completed" ? "Completed Games" : "Cancelled Bookings"}</div>
          <p className="tk-empty-sub">{tab === "upcoming" ? "Your next game is waiting." : "Nothing here yet."}</p>
          {tab === "upcoming" && <button className="tk-btn-primary">Find a Turf</button>}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- PROFILE ----------------------------------- */

function ProfileScreen({ dark, setDark, lang, setLang, favorites }) {
  const menu = [
    "Personal Information", "Saved Turfs", "Payment Methods", "Notifications",
    "Support", "Privacy", "Terms",
  ];
  return (
    <div className="tk-screen">
      <div className="tk-profile-header">
        <div className="tk-avatar">FR</div>
        <div className="tk-profile-name">Farhad</div>
        <div className="tk-profile-sub">Football Player · Dhanmondi</div>
      </div>

      <div className="tk-statsrow">
        <div className="tk-stat"><strong>12</strong><span>Bookings</span></div>
        <div className="tk-stat"><strong>18</strong><span>Matches</span></div>
        <div className="tk-stat"><strong>2</strong><span>Teams</span></div>
      </div>

      <div className="tk-card tk-togglerow">
        <div className="tk-togglerow-item">
          {dark ? <Moon size={16} /> : <Sun size={16} />}
          <span>Dark Mode</span>
          <button className={`tk-switch ${dark ? "tk-switch-on" : ""}`} onClick={() => setDark((v) => !v)}><span /></button>
        </div>
        <div className="tk-togglerow-item">
          <Globe size={16} />
          <span>Language</span>
          <div className="tk-langtoggle">
            <button className={lang === "en" ? "tk-lang-active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "bn" ? "tk-lang-active" : ""} onClick={() => setLang("bn")}>বাং</button>
          </div>
        </div>
      </div>

      <div className="tk-card tk-menu">
        {menu.map((m, i) => (
          <button key={m} className="tk-menuitem">
            <span>{m === "Saved Turfs" ? `${m} (${favorites.length})` : m}</span>
            <ChevronRight size={15} />
          </button>
        ))}
      </div>

      <button className="tk-logout">Logout</button>
    </div>
  );
}

/* ---------------------------------- SHELL ---------------------------------- */

const NAV = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "explore", label: "Explore", Icon: MapPin },
  { key: "play", label: "Play", Icon: Trophy },
  { key: "bookings", label: "Bookings", Icon: Calendar },
  { key: "profile", label: "Profile", Icon: User },
];

export default function TurfKhuji() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [tab, setTab] = useState("home");
  const [sport, setSport] = useState("football");
  const [favorites, setFavorites] = useState([1, 5]);

  const [homeDate, setHomeDate] = useState(1);
  const [homeTime, setHomeTime] = useState(2);

  const [selectedTurf, setSelectedTurf] = useState(null);
  const [dateIdx, setDateIdx] = useState(1);
  const [slot, setSlot] = useState(null);
  const [flowStep, setFlowStep] = useState(null); // null | 'summary' | 'payment' | 'success'
  const [hasBooking, setHasBooking] = useState(false);

  const toggleFav = (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const openTurf = (turf) => { setSelectedTurf(turf); setSlot(null); setFlowStep(null); };
  const closeTurf = () => { setSelectedTurf(null); setFlowStep(null); };
  const goExplore = () => { setSelectedTurf(null); setTab("explore"); };

  let content;
  if (selectedTurf && flowStep === null) {
    content = (
      <TurfDetails
        turf={selectedTurf}
        onBack={closeTurf}
        favorites={favorites}
        toggleFav={toggleFav}
        dateIdx={dateIdx}
        setDateIdx={setDateIdx}
        slot={slot}
        setSlot={setSlot}
        onContinue={() => setFlowStep("summary")}
      />
    );
  } else if (selectedTurf && flowStep === "summary") {
    content = (
      <BookingSummary
        turf={selectedTurf}
        dateIdx={dateIdx}
        slot={slot}
        onBack={() => setFlowStep(null)}
        onPay={() => setFlowStep("payment")}
      />
    );
  } else if (selectedTurf && flowStep === "payment") {
    const total = SLOTS[slot].price * 2 + 200 - 300;
    content = (
      <PaymentScreen
        total={total}
        onBack={() => setFlowStep("summary")}
        onPaid={() => { setFlowStep("success"); setHasBooking(true); }}
      />
    );
  } else if (selectedTurf && flowStep === "success") {
    content = (
      <SuccessScreen
        turf={selectedTurf}
        dateIdx={dateIdx}
        slot={slot}
        onDone={closeTurf}
        goBookings={() => setTab("bookings")}
      />
    );
  } else if (tab === "home") {
    content = (
      <HomeScreen
        lang={lang}
        sport={sport}
        setSport={setSport}
        favorites={favorites}
        toggleFav={toggleFav}
        openTurf={openTurf}
        goExplore={goExplore}
        date={homeDate}
        setDate={setHomeDate}
        time={homeTime}
        setTime={setHomeTime}
      />
    );
  } else if (tab === "explore") {
    content = <ExploreScreen sport={sport} setSport={setSport} favorites={favorites} toggleFav={toggleFav} openTurf={openTurf} />;
  } else if (tab === "play") {
    content = <PlayScreen />;
  } else if (tab === "bookings") {
    content = <BookingsScreen hasBooking={hasBooking} />;
  } else {
    content = <ProfileScreen dark={dark} setDark={setDark} lang={lang} setLang={setLang} favorites={favorites} />;
  }

  const showNav = !selectedTurf;

  return (
    <div className={`tk-root ${dark ? "" : "tk-light"}`}>
      <style>{CSS}</style>
      <div className="tk-phone">
        <div className="tk-statusbar">
          <span>9:41</span>
          <span className="tk-statusbar-icons">•••</span>
        </div>
        <div className={`tk-body ${showNav ? "" : "tk-body-full"}`}>
          {content}
        </div>
        {showNav && (
          <div className="tk-bottomnav">
            {NAV.map(({ key, label, Icon }) => (
              <button key={key} className={`tk-navitem ${tab === key ? "tk-navitem-active" : ""}`} onClick={() => setTab(key)}>
                <Icon size={key === "play" ? 22 : 20} className={key === "play" ? "tk-navitem-play" : ""} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------- CSS ------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap');

.tk-root{
  --bg:#07120B; --surface:#101A13; --elevated:#172219; --border: rgba(255,255,255,0.07);
  --text:#F8FAFC; --text2:#AAB6AE;
  --green:#16A34A; --green2:#22C55E; --warn:#F59E0B; --error:#EF4444; --info:#3B82F6;
  display:flex; justify-content:center; align-items:flex-start; padding:20px;
  font-family:'Inter','Hind Siliguri',sans-serif; color:var(--text);
  min-height:100%;
}
.tk-root.tk-light{
  --bg:#F7FAF8; --surface:#FFFFFF; --elevated:#EFF5F1; --border: rgba(18,32,24,0.08);
  --text:#122018; --text2:#66756B;
}
.tk-phone{
  width:390px; max-width:100%; height:820px; background:var(--bg);
  border-radius:38px; overflow:hidden; position:relative; display:flex; flex-direction:column;
  box-shadow:0 30px 60px rgba(0,0,0,0.4), 0 0 0 8px #000;
  border:2px solid #000;
}
.tk-statusbar{ display:flex; justify-content:space-between; padding:14px 26px 6px; font-size:13px; font-weight:600; color:var(--text); flex-shrink:0; }
.tk-body{ flex:1; overflow-y:auto; }
.tk-body::-webkit-scrollbar{ width:0; }
.tk-screen{ padding:14px 18px 24px; }
.tk-screen-nopad{ padding:0 0 24px; }
.tk-screen-pad{ padding:16px 18px 0; }

/* ---- typography ---- */
h1,h2,h3{ margin:0; font-family:'Inter',sans-serif; letter-spacing:-0.01em; }
.tk-hero-title{ font-size:24px; font-weight:800; margin:6px 0 14px; line-height:1.25; }
.tk-greeting{ font-size:15px; font-weight:600; color:var(--text); }
.tk-greeting span{ font-size:15px; }
.tk-location{ display:flex; align-items:center; gap:4px; background:none; border:none; color:var(--text2); font-size:12.5px; font-weight:600; padding:2px 0; margin-top:2px; cursor:pointer; }

/* ---- header / icon buttons ---- */
.tk-home-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
.tk-iconbtn{ background:var(--elevated); border:1px solid var(--border); width:38px; height:38px; border-radius:14px; display:flex; align-items:center; justify-content:center; color:var(--text); position:relative; cursor:pointer; }
.tk-iconbtn-glass{ background:rgba(0,0,0,0.35); backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.15); color:#fff; }
.tk-notifdot{ position:absolute; top:8px; right:9px; width:6px; height:6px; border-radius:50%; background:var(--error); }

/* ---- search ---- */
.tk-searchbar{ width:100%; display:flex; align-items:center; gap:10px; background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:14px 16px; color:var(--text2); font-size:14px; margin-bottom:16px; cursor:pointer; }
.tk-explore-search{ display:flex; align-items:center; gap:10px; background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:13px 16px; color:var(--text2); font-size:14px; margin-bottom:12px; }

/* ---- sport selector ---- */
.tk-sportrow{ display:flex; gap:10px; margin-bottom:16px; }
.tk-sportcard{ flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:14px; border-radius:16px; background:var(--surface); border:1.5px solid var(--border); color:var(--text2); font-weight:600; font-size:14px; cursor:pointer; }
.tk-sportcard-active{ border-color:var(--green2); background:rgba(34,197,94,0.12); color:var(--text); }
.tk-sport-emoji{ font-size:17px; }

/* ---- card base ---- */
.tk-card{ background:var(--surface); border:1px solid var(--border); border-radius:20px; }

/* ---- booking widget ---- */
.tk-bookwidget{ padding:16px; margin-bottom:22px; display:flex; flex-direction:column; gap:10px; }
.tk-bookwidget-row{ display:flex; }
.tk-bookwidget-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.tk-bookwidget-field{ display:flex; align-items:center; gap:10px; background:var(--elevated); border-radius:14px; padding:11px 12px; border:none; text-align:left; cursor:pointer; }
.tk-bookwidget-label{ font-size:11px; color:var(--text2); font-weight:600; }
.tk-bookwidget-value{ font-size:13.5px; font-weight:700; color:var(--text); margin-top:1px; }
.tk-bookwidget-icon{ font-size:18px; }
.tk-accenticon{ color:var(--green2); flex-shrink:0; }

.tk-btn-primary{ background:linear-gradient(135deg,var(--green),var(--green2)); color:#fff; border:none; border-radius:15px; padding:14px; font-size:15px; font-weight:700; cursor:pointer; box-shadow:0 8px 20px rgba(22,163,74,0.35); }
.tk-btn-block{ width:100%; margin-top:4px; }
.tk-btn-secondary{ background:var(--elevated); color:var(--text); border:1px solid var(--border); border-radius:14px; padding:12px; font-size:13.5px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; }
.tk-btn-sm{ padding:9px 10px; font-size:12.5px; flex:1; }

/* ---- section header ---- */
.tk-sectionhead{ display:flex; justify-content:space-between; align-items:center; margin:22px 0 4px; }
.tk-sectionhead h3{ font-size:17px; font-weight:700; }
.tk-sectionsub{ font-size:12.5px; color:var(--text2); margin:0 0 12px; }
.tk-linkbtn{ background:none; border:none; color:var(--green2); font-size:13px; font-weight:600; display:flex; align-items:center; gap:2px; cursor:pointer; padding:0; }
.tk-linkbtn-block{ margin-top:6px; }
.tk-bolt{ color:var(--warn); }

/* ---- horizontal scroll / turf cards ---- */
.tk-hscroll{ display:flex; gap:12px; overflow-x:auto; padding:4px 0 6px; margin:0 -18px; padding-left:18px; padding-right:18px; }
.tk-hscroll::-webkit-scrollbar{ display:none; }
.tk-vlist{ display:flex; flex-direction:column; gap:12px; margin-top:4px; }

.tk-turfcard{ flex:0 0 200px; text-align:left; border:1px solid var(--border); background:var(--surface); border-radius:18px; overflow:hidden; padding:0; cursor:pointer; display:block; }
.tk-turfcard-compact{ flex:0 0 170px; }
.tk-vlist .tk-turfcard{ flex:1 1 auto; width:100%; }
.tk-turfcard-media{ position:relative; }
.tk-turfcard-body{ padding:11px 12px 13px; display:flex; flex-direction:column; gap:4px; }
.tk-turfcard-toprow{ display:flex; justify-content:space-between; align-items:flex-start; gap:6px; }
.tk-turfcard-name{ font-size:14px; font-weight:700; line-height:1.25; }
.tk-turfcard-meta{ font-size:11.5px; color:var(--text2); display:flex; align-items:center; gap:4px; }
.tk-turfcard-bottom{ display:flex; justify-content:space-between; align-items:center; margin-top:5px; }
.tk-price{ font-size:14px; font-weight:800; color:var(--text); }
.tk-price-unit{ font-size:11px; font-weight:500; color:var(--text2); }

/* ---- turf image ---- */
.tk-turfimg{ position:relative; width:100%; height:118px; overflow:hidden; background:#0c1a10; display:flex; align-items:center; justify-content:center; }
.tk-turfimg-lg{ height:230px; }
.tk-turfimg-sm{ width:74px; height:74px; border-radius:14px; flex-shrink:0; }
.tk-turfimg-stripes{ position:absolute; inset:0; background:repeating-linear-gradient(100deg, #163823 0 26px, #123019 26px 52px); }
.tk-turfimg-glow{ position:absolute; inset:0; background:radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(34,197,94,0.35), transparent 50%); }
.tk-turfimg-icon{ position:relative; font-size:30px; opacity:0.85; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.4)); }
.tk-turfimg-lg .tk-turfimg-icon{ font-size:52px; }

.tk-heart{ position:absolute; top:9px; right:9px; width:30px; height:30px; border-radius:50%; background:rgba(0,0,0,0.4); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.tk-badge{ position:absolute; font-size:10px; font-weight:700; padding:4px 8px; border-radius:20px; display:flex; align-items:center; gap:3px; }
.tk-badge-verified{ top:9px; left:9px; background:rgba(22,163,74,0.9); color:#fff; }
.tk-badge-inline{ position:static; display:inline-flex; margin-bottom:8px; }
.tk-badge-warn{ bottom:9px; left:9px; background:var(--warn); color:#1a1200; }
.tk-badge-gray{ bottom:9px; left:9px; background:rgba(255,255,255,0.25); color:#fff; }

.tk-rating{ font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:3px; flex-shrink:0; }
.tk-rating-count{ color:var(--text2); font-weight:500; }

.tk-pill{ font-size:10.5px; font-weight:700; padding:4px 9px; border-radius:20px; display:flex; align-items:center; gap:4px; }
.tk-pill-green{ background:rgba(34,197,94,0.16); color:var(--green2); }
.tk-pill-warn{ background:rgba(245,158,11,0.16); color:var(--warn); }
.tk-pill-gray{ background:rgba(148,163,184,0.16); color:var(--text2); }
.tk-dot{ width:6px; height:6px; border-radius:50%; background:var(--green2); box-shadow:0 0 0 3px rgba(34,197,94,0.25); }

/* ---- chips ---- */
.tk-chiprow{ display:flex; gap:9px; overflow-x:auto; margin-top:2px; }
.tk-chiprow::-webkit-scrollbar{ display:none; }
.tk-chiprow-scroll{ margin:12px -18px 8px; padding:0 18px; }
.tk-areachip{ flex-shrink:0; background:var(--surface); border:1px solid var(--border); color:var(--text); padding:9px 16px; border-radius:20px; font-size:13px; font-weight:600; cursor:pointer; }
.tk-filterchip{ flex-shrink:0; display:flex; align-items:center; gap:5px; background:var(--surface); border:1px solid var(--border); color:var(--text2); padding:8px 13px; border-radius:20px; font-size:12.5px; font-weight:600; cursor:pointer; }
.tk-sportchip{ background:var(--elevated); border:1px solid var(--border); padding:8px 14px; border-radius:20px; font-size:12.5px; font-weight:600; }

/* ---- promo ---- */
.tk-promo{ margin-top:22px; background:linear-gradient(120deg, rgba(22,163,74,0.25), rgba(245,158,11,0.15)); border:1px solid rgba(34,197,94,0.3); border-radius:18px; padding:16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; }
.tk-promo-title{ font-weight:800; font-size:14.5px; }
.tk-promo-sub{ font-size:12px; color:var(--text2); margin-top:2px; }
.tk-promo-cta{ font-size:12.5px; font-weight:700; color:var(--green2); display:flex; align-items:center; white-space:nowrap; }

/* ---- explore ---- */
.tk-tabrow{ display:flex; gap:8px; margin-bottom:10px; }
.tk-tab{ flex:1; padding:10px; border-radius:13px; border:1px solid var(--border); background:var(--surface); color:var(--text2); font-weight:700; font-size:13px; cursor:pointer; }
.tk-tab-active{ background:rgba(34,197,94,0.14); border-color:var(--green2); color:var(--text); }
.tk-explore-toolbar{ display:flex; justify-content:space-between; align-items:center; margin:8px 0 12px; }
.tk-explore-count{ font-size:12.5px; color:var(--text2); font-weight:600; }
.tk-segment{ display:flex; background:var(--elevated); border-radius:10px; padding:2px; }
.tk-segment-btn{ display:flex; align-items:center; gap:4px; border:none; background:none; color:var(--text2); font-size:12px; font-weight:600; padding:6px 10px; border-radius:8px; cursor:pointer; }
.tk-segment-active{ background:var(--surface); color:var(--text); }

.tk-mapview{ position:relative; height:420px; border-radius:18px; overflow:hidden; background:#0c1a10; border:1px solid var(--border); }
.tk-mapview-grid{ position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size:26px 26px; }
.tk-mappin{ position:absolute; border:none; background:none; cursor:pointer; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.5)); }
.tk-mappin-available{ color:var(--green2); }
.tk-mappin-few{ color:var(--warn); }
.tk-mappin-booked{ color:#8a978d; }
.tk-minimap{ position:relative; height:130px; border-radius:16px; overflow:hidden; background:#0c1a10; border:1px solid var(--border); margin-top:8px; }
.tk-loc-row{ display:flex; justify-content:space-between; align-items:center; font-size:12.5px; color:var(--text2); margin-top:8px; }

/* ---- turf details ---- */
.tk-details-hero{ position:relative; }
.tk-details-hero-top{ position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; }
.tk-hero-actions{ display:flex; gap:8px; }
.tk-details-title{ font-size:22px; font-weight:800; margin:4px 0 8px; }
.tk-details-subrow{ display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--text2); flex-wrap:wrap; margin-bottom:16px; }
.tk-details-meta{ display:flex; align-items:center; gap:3px; }
.tk-dotsep{ opacity:0.5; }
.tk-quickactions{ display:flex; gap:10px; margin-bottom:18px; }
.tk-quickaction{ flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:11px 6px; font-size:11.5px; font-weight:600; color:var(--text); cursor:pointer; }

.tk-facilgrid{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:8px; }
.tk-facil{ display:flex; flex-direction:column; align-items:center; gap:6px; background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:12px 4px; font-size:11px; font-weight:600; color:var(--text2); text-align:center; }

.tk-desc{ font-size:13.5px; line-height:1.6; color:var(--text2); margin:6px 0 0; }
.tk-desc-clamped{ display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

.tk-pricingtable{ padding:6px 16px; margin-top:8px; }
.tk-pricerow{ display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); font-size:13.5px; }
.tk-pricerow:last-child{ border-bottom:none; }
.tk-pricerow-label{ font-weight:700; }
.tk-pricerow-range{ font-size:11.5px; color:var(--text2); margin-top:1px; }
.tk-pricerow-value{ font-weight:800; align-self:center; }
.tk-pricerow-total{ font-weight:800; font-size:15px; }
.tk-green-text{ color:var(--green2); }

.tk-datescroll{ display:flex; gap:10px; overflow-x:auto; margin-top:10px; padding-bottom:2px; }
.tk-datechip{ flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:2px; width:56px; padding:10px 0; border-radius:14px; border:1.5px solid var(--border); background:var(--surface); color:var(--text2); cursor:pointer; font-size:11px; font-weight:700; }
.tk-datechip strong{ font-size:16px; color:var(--text); }
.tk-datechip-active{ background:var(--green); border-color:var(--green); color:#fff; }
.tk-datechip-active strong{ color:#fff; }

.tk-slotgrid{ display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:12px; }
.tk-slot{ display:flex; justify-content:space-between; align-items:center; padding:13px 14px; border-radius:14px; border:1.5px solid var(--green2); background:transparent; color:var(--text); font-size:13px; font-weight:700; cursor:pointer; }
.tk-slot em{ font-style:normal; color:var(--text2); font-weight:600; font-size:12px; }
.tk-slot-selected{ background:var(--green); border-color:var(--green); }
.tk-slot-selected em{ color:rgba(255,255,255,0.85); }
.tk-slot-booked{ border-color:var(--border); color:#6b776f; cursor:not-allowed; opacity:0.55; }
.tk-slot-booked em{ color:#6b776f; }

.tk-stickycta{ position:fixed; bottom:0; left:0; right:0; max-width:390px; margin:0 auto; background:var(--surface); border-top:1px solid var(--border); padding:14px 18px calc(14px + env(safe-area-inset-bottom,0px)); display:flex; justify-content:space-between; align-items:center; }
.tk-stickycta-title{ font-size:11.5px; color:var(--text2); font-weight:600; }
.tk-stickycta-price{ font-size:17px; font-weight:800; margin-top:1px; }

/* ---- booking flow ---- */
.tk-flowhead{ display:flex; align-items:center; gap:12px; margin-bottom:18px; }
.tk-flowhead h2{ font-size:18px; font-weight:800; }
.tk-summarycard{ padding:16px; display:flex; flex-direction:column; gap:6px; }
.tk-summarycard-title{ font-size:15.5px; font-weight:800; margin-bottom:4px; }
.tk-summarycard-row{ display:flex; align-items:center; gap:7px; font-size:13px; color:var(--text2); }
.tk-promoinput{ display:flex; gap:8px; margin-top:16px; }
.tk-promoinput input{ flex:1; background:var(--surface); border:1px solid var(--border); border-radius:13px; padding:12px 14px; color:var(--text); font-size:13px; }
.tk-promoinput button{ background:var(--elevated); border:1px solid var(--border); border-radius:13px; padding:0 16px; color:var(--text); font-weight:700; font-size:13px; cursor:pointer; }

.tk-paymethods{ display:flex; flex-direction:column; gap:10px; margin:6px 0 20px; }
.tk-paymethod{ display:flex; align-items:center; gap:12px; padding:15px 16px; border-radius:15px; border:1.5px solid var(--border); background:var(--surface); color:var(--text); font-size:14px; font-weight:700; cursor:pointer; }
.tk-paymethod-active{ border-color:var(--green2); background:rgba(34,197,94,0.1); }
.tk-paymethod-dot{ width:12px; height:12px; border-radius:4px; }
.tk-paymethod .tk-accenticon{ margin-left:auto; }
.tk-totalcard{ display:flex; justify-content:space-between; align-items:center; padding:16px 18px; margin-bottom:14px; font-size:14px; color:var(--text2); font-weight:600; }
.tk-totalcard strong{ font-size:19px; color:var(--text); }
.tk-finetext{ display:flex; align-items:flex-start; gap:6px; font-size:11.5px; color:var(--text2); line-height:1.5; margin-bottom:18px; }

/* ---- success ---- */
.tk-success{ display:flex; flex-direction:column; align-items:center; text-align:center; padding-top:30px; }
.tk-success-check{ width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg,var(--green),var(--green2)); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 12px 30px rgba(22,163,74,0.4); margin-bottom:18px; }
.tk-success h1{ font-size:21px; font-weight:800; margin-bottom:4px; }
.tk-success-sub{ color:var(--text2); font-size:13px; font-weight:600; margin:0 0 20px; }
.tk-successcard{ width:100%; padding:16px; text-align:left; }
.tk-successcard-id{ margin-top:10px; padding-top:10px; border-top:1px solid var(--border); font-size:12px; color:var(--text2); }
.tk-successcard-id strong{ color:var(--text); }
.tk-success-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; width:100%; margin-top:18px; }

/* ---- play ---- */
.tk-playgrid{ display:flex; flex-direction:column; gap:12px; }
.tk-playcard{ display:flex; flex-direction:column; align-items:flex-start; gap:4px; padding:18px; text-align:left; cursor:pointer; }
.tk-playcard-icon{ font-size:24px; margin-bottom:4px; }
.tk-playcard-title{ font-size:15px; font-weight:800; }
.tk-playcard-sub{ font-size:12px; color:var(--text2); }

/* ---- bookings ---- */
.tk-bookingcard{ display:flex; gap:12px; padding:12px; }
.tk-bookingcard-body{ display:flex; flex-direction:column; gap:4px; flex:1; }
.tk-bookingcard-title{ font-weight:800; font-size:14.5px; margin-bottom:2px; }
.tk-countdown{ font-size:12px; font-weight:700; color:var(--warn); margin:4px 0 8px; }
.tk-bookingcard-actions{ display:flex; gap:8px; }
.tk-empty{ display:flex; flex-direction:column; align-items:center; text-align:center; padding:60px 20px; }
.tk-empty-illus{ font-size:34px; margin-bottom:14px; opacity:0.7; }
.tk-empty-title{ font-weight:800; font-size:15px; margin-bottom:4px; }
.tk-empty-sub{ font-size:12.5px; color:var(--text2); margin:0 0 18px; }

/* ---- profile ---- */
.tk-profile-header{ display:flex; flex-direction:column; align-items:center; text-align:center; padding:10px 0 20px; }
.tk-avatar{ width:66px; height:66px; border-radius:50%; background:linear-gradient(135deg,var(--green),var(--green2)); color:#fff; font-weight:800; font-size:20px; display:flex; align-items:center; justify-content:center; margin-bottom:10px; }
.tk-profile-name{ font-size:18px; font-weight:800; }
.tk-profile-sub{ font-size:12.5px; color:var(--text2); margin-top:2px; }
.tk-statsrow{ display:flex; justify-content:space-around; padding:16px 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); margin-bottom:16px; }
.tk-stat{ display:flex; flex-direction:column; align-items:center; gap:2px; }
.tk-stat strong{ font-size:18px; font-weight:800; }
.tk-stat span{ font-size:11px; color:var(--text2); font-weight:600; }
.tk-togglerow{ padding:6px 16px; margin-bottom:14px; }
.tk-togglerow-item{ display:flex; align-items:center; gap:10px; padding:12px 0; font-size:13.5px; font-weight:600; border-bottom:1px solid var(--border); }
.tk-togglerow-item:last-child{ border-bottom:none; }
.tk-switch{ margin-left:auto; width:38px; height:22px; border-radius:20px; background:var(--elevated); border:1px solid var(--border); position:relative; cursor:pointer; }
.tk-switch span{ position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%; background:var(--text2); transition:transform 0.15s; }
.tk-switch-on{ background:var(--green); border-color:var(--green); }
.tk-switch-on span{ transform:translateX(16px); background:#fff; }
.tk-langtoggle{ margin-left:auto; display:flex; background:var(--elevated); border-radius:9px; padding:2px; }
.tk-langtoggle button{ border:none; background:none; color:var(--text2); font-size:12px; font-weight:700; padding:5px 10px; border-radius:7px; cursor:pointer; }
.tk-lang-active{ background:var(--surface); color:var(--text); }
.tk-menu{ padding:4px 16px; margin-bottom:20px; }
.tk-menuitem{ width:100%; display:flex; justify-content:space-between; align-items:center; padding:13px 0; border-bottom:1px solid var(--border); background:none; border-left:none; border-right:none; border-top:none; color:var(--text); font-size:13.5px; font-weight:600; cursor:pointer; }
.tk-menuitem:last-child{ border-bottom:none; }
.tk-logout{ width:100%; background:none; border:1.5px solid var(--error); color:var(--error); border-radius:14px; padding:13px; font-weight:700; font-size:14px; cursor:pointer; }

/* ---- bottom nav ---- */
.tk-bottomnav{ display:flex; border-top:1px solid var(--border); background:var(--surface); padding:8px 6px calc(8px + env(safe-area-inset-bottom,0px)); flex-shrink:0; }
.tk-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; background:none; border:none; color:var(--text2); font-size:10.5px; font-weight:600; padding:6px 0; cursor:pointer; }
.tk-navitem-active{ color:var(--green2); }
.tk-navitem-play{ color:var(--green2); }
`;
