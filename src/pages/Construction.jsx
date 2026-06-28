import React, { useState } from "react";
import {
  CheckCircle2,
  Ruler,
  Layers,
  ShieldCheck,
  Hammer,
  Wrench,
  ClipboardCheck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Container from "../components/container";

import landmarkImg from "../assets/construct/landmark.JPG";
import accraimg from "../assets/construct/accra.webp";
import Modal from "../components/modal/Modal";
import { AnimatePresence } from "framer-motion";
import layerImage from "../assets/construct/courtLayers.webp";
import { Helmet } from "react-helmet-async";
/**
 * MeliSports Retail — Tennis & Padel Court Construction service page
 * --------------------------------------------------------------------
 * Bright, light-themed page. Tailwind utility classes only.
 * Drop into any React + Tailwind project. Swap the placeholder image
 * URLs (marked "REPLACE") with real project photography before launch —
 * stock photography here is for layout purposes only.
 *
 * Fonts used in the design (add to your index.html or _document.js):
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
 *
 * Tailwind config additions (tailwind.config.js):
 *   fontFamily: {
 *     display: ['Oswald', 'sans-serif'],
 *     body: ['Inter', 'sans-serif'],
 *     mono: ['"IBM Plex Mono"', 'monospace'],
 *   },
 *   colors: {
 *     court: { green: '#1E5631', clay: '#C2410C', ink: '#0F172A', cream: '#F7F5EF', ball: '#FACC15' },
 *   }
 *
 * If you haven't extended Tailwind's theme, this file also works as-is
 * using arbitrary value syntax (bg-[#1E5631] etc.) — both are included
 * below via the `court-*` classes with fallback arbitrary values.
 */

// ---------------------------------------------------------------------------
// Placeholder data — replace with real project content / CMS data
// ---------------------------------------------------------------------------

const COMPLETED_PROJECTS = [
  {
    id: 1,
    name: "Landmark Nike Laske Resort",
    location: "Enugu, Enugu State",
    type: "Tennis",
    surface: "Acrylic Hard Court",
    completed: "Mar 2026",
    image: landmarkImg,
  },
  {
    id: 2,
    name: "The Padel Club Accra ",
    location: "East Legon - Karroum St, Accra, Ghana",
    type: "Padel",
    surface: "Artificial Turf + Panoramic Glass",
    completed: "Jan 2026",
    image: accraimg,
  },
];

const PROCESS_STEPS = [
  {
    label: "Site Survey",
    desc: "We assess soil, drainage, and orientation before anything is costed.",
    icon: Ruler,
  },
  {
    label: "Base & Sub-Base",
    desc: "Excavation, compaction, and a stable asphalt or concrete foundation.",
    icon: Layers,
  },
  {
    label: "Surfacing",
    desc: "Acrylic coating, cushioned systems, or artificial turf — to ITF/ASBA spec.",
    icon: Hammer,
  },
  {
    label: "Fixtures & Fencing",
    desc: "Posts, nets, glass walls, fencing, and lighting installed and tested.",
    icon: Wrench,
  },
  {
    label: "Final Inspection",
    desc: "Line markings checked, bounce-tested, and signed off before handover.",
    icon: ClipboardCheck,
  },
];

const SERVICES = [
  {
    title: "New Tennis Court Construction",
    desc: "Full-spec hard courts built from the ground up — excavation through final line marking, for clubs, schools, and private residences.",
  },
  {
    title: "Padel Court Installation",
    desc: "Turnkey padel courts including steel/glass structure, artificial turf, and lighting, sized to ITPA/ASBA standard dimensions.",
  },
  {
    title: "Resurfacing & Renovation",
    desc: "Bringing tired or cracked courts back to tournament condition with new acrylic systems and re-marking.",
  },
  {
    title: "Lighting & Fencing Upgrades",
    desc: "LED court lighting and perimeter fencing installed to extend play into the evening, safely.",
  },
];

// ---------------------------------------------------------------------------
// Small reusable bits
// ---------------------------------------------------------------------------

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-[#C2410C]" />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C2410C]">
        {children}
      </span>
    </div>
  );
}

function CornerFrame({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-[#1E5631]" />
      <span className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-[#1E5631]" />
      <span className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-[#1E5631]" />
      <span className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-[#1E5631]" />
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function CourtConstructionPage() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const filteredProjects =
    filter === "All"
      ? COMPLETED_PROJECTS
      : COMPLETED_PROJECTS.filter((p) => p.type === filter);

  return (
    <Container className="min-h-screen text-[#0F172A] font-body">
      <Helmet>
        Tennis Court Contruction | MeliBuild
        <meta
          name="description"
          content={` online in Nigeria from MeliBuild.
    Shop quality and sports equipment at competitive prices.`}
        />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content={landmarkImg} />
        <meta property="og:type" content="product" />
        <link rel="canonical" href={`https://melisports.com/construction`} />
      </Helmet>
      <section className="relative overflow-hidden border-b border-[#0F172A]/10">
        <div className="absolute inset-0">
          <img
            src="https://www.centrodeportivocortijoalto.com/wp-content/uploads/2023/06/tipos-pistas-de-tenis.jpg"
            alt="Newly built tennis court at sunset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-[#0F172A]/55 to-[#0F172A]/20" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-[#FACC15] text-[#0F172A] font-mono text-xs font-medium uppercase tracking-wide px-3 py-1.5 rounded-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              ASBA Certified Builder
            </span>
          </div>

          <h1 className="font-display font-normal uppercase text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white max-w-3xl">
            We build the courts
            <span className="block text-[#FACC15]">you play on for years.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
            MeliBuild offers full-scale tennis and padel court construction —
            from bare ground to final line marking — built to American Sports
            Builders Association standard, by a team that also outfits the
            courts we build.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#C2410C] hover:bg-[#9a3409] transition-colors text-white font-display font-medium uppercase text-sm tracking-wide px-6 py-3.5 rounded-sm"
            >
              Request a Free Site Assessment
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-white font-medium text-sm border-b border-white/40 hover:border-white pb-1 transition-colors"
            >
              See Completed Courts
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* STAT / SPEC BAR — styled like a court's service line             */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[#1E5631] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
            {[
              { value: "40+", label: "Courts Built" },
              { value: "ASBA", label: "Certified Builder" },
              { value: "8 States", label: "Projects Delivered" },
              { value: "5 Yr", label: "Surface Warranty" },
            ].map((stat) => (
              <div key={stat.label} className="py-7 px-4 text-center">
                <div className="font-display font-normal text-2xl md:text-3xl">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-white/70 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SERVICES — what we offer                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <SectionLabel>What We Build</SectionLabel>
          <h2 className="font-display font-normal uppercase text-3xl md:text-4xl leading-tight">
            Tennis & padel construction, start to finish
          </h2>
          <p className="mt-4 text-[#0F172A]/70 leading-relaxed">
            Every court is built by our in-house crew — no subcontracted
            guesswork. We handle the parts most companies skip past: drainage
            planning, sub-base compaction, and surface curing time, so the court
            still plays true five years from now.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-px bg-[#0F172A]/10 border border-[#0F172A]/10">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-[#F7F5EF] p-8 hover:bg-white transition-colors"
            >
              <h3 className="font-display font-normal text-lg uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-[#0F172A]/70 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PROCESS — build timeline                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white border-y border-[#0F172A]/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <SectionLabel>How A Build Runs</SectionLabel>
          <h2 className="font-display font-normal uppercase text-3xl md:text-4xl leading-tight max-w-xl">
            Five stages, one team, no handoffs
          </h2>

          <div className="mt-14 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-[#0F172A]/15" />
            <div className="grid md:grid-cols-5 gap-10 md:gap-6">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="relative">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-[#1E5631] text-white items-center justify-center relative z-10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="md:hidden flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-[#1E5631] text-white flex items-center justify-center shrink-0">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-mono text-xs text-[#C2410C]">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-4 md:mt-5">
                      <span className="hidden md:block font-mono text-xs text-[#C2410C] mb-1">
                        0{i + 1}
                      </span>
                      <h3 className="font-display font-normal uppercase text-sm tracking-wide">
                        {step.label}
                      </h3>
                      <p className="mt-2 text-sm text-[#0F172A]/65 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <CornerFrame className="p-6 bg-white flex flex-col items-center justify-center text-center">
            <img src={layerImage} alt="layers" className="h-[400px]" />
          </CornerFrame>

          <div>
            <SectionLabel>Activities</SectionLabel>
            <h2 className="font-display font-normal uppercase text-3xl md:text-4xl leading-tight">
              We’re Ready to design, construct, and maintain your project to
              launch{" "}
            </h2>
            <p className="mt-4 text-[#0F172A] text-base leading-relaxed">
              MeliBuild specializes in the design and construction of
              high-performance tennis and padel court facilities, delivering
              solutions tailored to meet the demands of modern sports
              environments. Our expertise extends beyond racket sports, with
              experience in large-scale athletic projects featuring premium wood
              and synthetic flooring systems for basketball courts, aerobics
              studios, indoor tracks, and weight training facilities. We also
              provide complete squash court construction services, combining
              quality materials, innovative techniques, and proven expertise.
              With over twenty-three years of experience and continuous
              research, Melistruct delivers state-of-the-art sports surfaces
              built for performance, durability, and long-term value.
            </p>
            <ul className="mt-6 flex gap-4">
              {[
                {
                  text: "The experts to call it’s time for your tennis court to be resurfaced",
                  header: "Court Reconstrution",
                  icon: "/assets/icons/construction.png",
                },
                {
                  header: "Court Resurfacing ",
                  text: "The experts to call it’s time for your tennis court to be resurfaced",
                  icon: "/assets/icons/paint-roller.png",
                },
              ].map((item) => (
                <li
                  key={item}
                  className="flex border p-4 items-center flex-col flex-1 text-center justify-start gap-3 text-sm  bg-[#F7F5EF] hover:bg-white transition-colors"
                >
                  <img
                    src={item.icon}
                    className="block ml-0  h-14 w-14 m-auto"
                  />
                  <p className="font-semibold text-left w-full">
                    {item.header}
                  </p>
                  <p className="text-[#0F172A]/80 text-justify block w-full">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <CornerFrame className="p-10 bg-white flex flex-col items-center justify-center text-center">
            <ShieldCheck className="h-12 w-12 text-[#1E5631]" />
            <p className="font-display font-normal uppercase text-sm tracking-widest mt-4">
              ASBA Certified
            </p>
            <p className="font-mono text-[11px] text-[#0F172A]/60 mt-1">
              American Sports Builders Association
            </p>
          </CornerFrame>

          <div>
            <SectionLabel>Certification</SectionLabel>
            <h2 className="font-display font-normal uppercase text-3xl md:text-4xl leading-tight">
              Built to the standard the industry checks against
            </h2>
            <p className="mt-4 text-[#0F172A]/70 leading-relaxed">
              MeliSports Retail's construction team is certified by the American
              Sports Builders Association (ASBA), the body whose guidelines
              define correct drainage slope, surface tolerance, and base
              construction for tennis and padel courts. It's the difference
              between a court that looks finished and one that plays correctly
              for the next decade.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Construction methods audited against ASBA technical guidelines",
                "Surface tolerances and drainage verified before handover",
                "Ongoing training as ASBA standards are updated",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#1E5631] mt-0.5 shrink-0" />
                  <span className="text-[#0F172A]/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* COMPLETED PROJECTS — gallery with filter                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="projects" className="bg-white border-y border-[#0F172A]/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel>Completed Courts</SectionLabel>
              <h2 className="font-display font-normal uppercase text-3xl md:text-4xl leading-tight">
                Finished jobs, real locations
              </h2>
            </div>

            <div className="flex gap-2">
              {["All", "Tennis", "Padel"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${
                    filter === tab
                      ? "bg-[#1E5631] text-white border-[#1E5631]"
                      : "bg-transparent text-[#0F172A]/70 border-[#0F172A]/20 hover:border-[#1E5631]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0F172A]/5">
                  <img
                    src={project.image}
                    alt={`${project.name} — completed ${project.type.toLowerCase()} court`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#FACC15] text-[#0F172A] font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-sm">
                    {project.type}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display font-normal text-base uppercase tracking-tight">
                    {project.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#0F172A]/60">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#0F172A]/55 border-t border-[#0F172A]/10 pt-3">
                    <span>{project.surface}</span>
                    <span>{project.completed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-[#0F172A]/50 py-16">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CALL TO ACTION / CONTACT                                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="contact" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop"
            alt="Completed padel court ready for play"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-28 text-center">
          <SectionLabel>
            <span className="text-[#FACC15]">Get Started</span>
          </SectionLabel>
          <h2 className="font-display font-normal uppercase text-3xl md:text-5xl leading-tight text-white">
            Have land? Let's see what fits on it.
          </h2>
          <p className="mt-5 text-white/75 max-w-xl mx-auto leading-relaxed">
            Tell us your space, budget, and surface preference. We'll send back
            a no-obligation assessment and a build timeline within 2 business
            days.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* <a
              href="mailto:courts@melisportsretail.com"
              className="inline-flex items-center gap-2 bg-[#C2410C] hover:bg-[#9a3409] transition-colors text-white font-display font-medium uppercase text-sm tracking-wide px-7 py-4 rounded-sm w-full sm:w-auto justify-center"
            >
              <Mail className="h-4 w-4" />
              Request a Quote
            </a> */}
            <buttton
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 bg-[#C2410C] hover:bg-[#9a3409] transition-colors text-white font-display font-medium uppercase text-sm tracking-wide px-7 py-4 rounded-sm w-full sm:w-auto justify-center"
            >
              <Mail className="h-4 w-4" />
              Request a Quote
            </buttton>
            <a
              href="tel:+2347064334160"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 transition-colors text-white font-display font-medium uppercase text-sm tracking-wide px-7 py-4 rounded-sm w-full sm:w-auto justify-center"
            >
              <Phone className="h-4 w-4" />
              Call the Build Team
            </a>
          </div>

          <p className="mt-8 font-mono text-xs text-white/50 uppercase tracking-wide">
            ASBA Certified · MeliBusiness Construction Division
          </p>
        </div>
      </section>
      <Modal open={open} setOpen={setOpen}>
        <QuoteRequestForm />
      </Modal>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER STRIP                                                    */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-[#0F172A] text-white/60">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <span>
            © {new Date().getFullYear()} MeliSports Retail. All rights
            reserved.
          </span>
          <a
            href="/"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            Back to Store <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </Container>
  );
}

function QuoteRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    courtType: "",
    numberOfCourts: "1",
    location: "",
    timeline: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Send to your API
    const response = await fetch("/api/quote-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <h2 className="text-xl font-normal">Quote Request Received</h2>
        <p className="mt-2">
          Thanks for contacting us. Our team will review your project details
          and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-xl border p-6 shadow"
    >
      <div>
        <h2 className="text-2xl font-normal">Request a Tennis Court Quote</h2>
        <p className="text-gray-600">
          Tell us about your project and we will prepare a custom estimate.
        </p>
      </div>

      {/* Contact Information */}

      <input
        name="name"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded border p-3"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded border p-3"
        required
      />

      <input
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      {/* Project Information */}

      <select
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        className="w-full rounded border p-3"
        required
      >
        <option value="">Select project type</option>
        <option value="new-construction">New Tennis Court Construction</option>
        <option value="resurfacing">Court Resurfacing</option>
        <option value="repair">Court Repairs</option>
        <option value="lighting">Lighting Installation</option>
      </select>

      <select
        name="courtType"
        value={formData.courtType}
        onChange={handleChange}
        className="w-full rounded border p-3"
      >
        <option value="">Select court surface</option>
        <option value="hard">Hard Court</option>
        <option value="clay">Clay Court</option>
        <option value="synthetic">Synthetic Court</option>
        <option value="acrylic">Acrylic Surface</option>
      </select>

      <input
        name="numberOfCourts"
        type="number"
        min="1"
        placeholder="Number of courts"
        value={formData.numberOfCourts}
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <input
        name="location"
        placeholder="Project location"
        value={formData.location}
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <select
        name="timeline"
        value={formData.timeline}
        onChange={handleChange}
        className="w-full rounded border p-3"
      >
        <option value="">Desired timeline</option>
        <option value="asap">ASAP</option>
        <option value="1-3-months">1-3 months</option>
        <option value="3-6-months">3-6 months</option>
        <option value="planning">Just planning</option>
      </select>

      <textarea
        name="message"
        placeholder="Tell us more about your project..."
        value={formData.message}
        onChange={handleChange}
        rows={5}
        className="w-full rounded border p-3"
      />

      <button
        type="submit"
        className="w-full rounded bg-green-600 p-3 font-normal text-white"
      >
        Request Quote
      </button>
    </form>
  );
}
