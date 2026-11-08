import { InfoPageLayout } from "../components/layout/InfoPageLayout";

const sections = [
  {
    heading: "Using Holidaze",
    text: "Holidaze connects guests with venue managers. By creating an account you agree to provide accurate information and to use the service in a respectful way.",
  },
  {
    heading: "Bookings",
    text: "A booking is an agreement between the guest and the venue manager. Guests can cancel their own bookings from their profile. Venue managers are responsible for keeping their venue information up to date.",
  },
  {
    heading: "Your data",
    text: "We store the information you give us, such as your name, email, avatar and bookings, so the service can work. We do not sell your data to third parties.",
  },
  {
    heading: "Cookies and storage",
    text: "We use your browser's local storage to keep you logged in. No tracking cookies are used.",
  },
  {
    heading: "Changes",
    text: "We may update these terms from time to time. The latest version will always be available on this page.",
  },
];

export function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms & Privacy"
      intro="This is a student project. The terms below are for demonstration purposes only."
    >
      {sections.map(({ heading, text }) => (
        <section key={heading}>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            {heading}
          </h2>
          <p>{text}</p>
        </section>
      ))}
    </InfoPageLayout>
  );
}
