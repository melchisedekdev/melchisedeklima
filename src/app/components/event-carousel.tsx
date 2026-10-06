"use client";

import { useState } from "react";
import Image from "next/image";

type EventItem = {
  type: string;
  title: string;
  place: string;
  year: string;
  description: string;
  photo: string;
  style: string;
  image?: string;
  imageAlt?: string;
};

export function EventCarousel({ events }: { events: EventItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const event = events[activeIndex];

  if (!event) return null;

  return (
    <div className="event-carousel" aria-live="polite">
      <article className="event-card" key={`${event.title}-${activeIndex}`}>
        <div className={`event-visual ${event.style}${event.image ? " has-photo" : ""}`} role="img" aria-label={event.imageAlt ?? `Foto do evento: ${event.title}`}>
          {event.image ? <Image src={event.image} alt="" fill sizes="(max-width: 780px) 100vw, 32vw" /> : <span>{event.photo}</span>}
          <b>{event.year}</b>
        </div>
        <div className="event-caption">
          <p>{event.type}</p>
          <h3>{event.title}</h3>
          <span>{event.place}</span>
          <p className="event-description">{event.description}</p>
          <footer className="event-controls">
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</span>
            <button
              type="button"
              aria-label="Próximo evento"
              onClick={() => setActiveIndex((index) => (index + 1) % events.length)}
            >
              <span>PRÓXIMO EVENTO</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="M3 10h13M10 4l6 6-6 6" />
              </svg>
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}
