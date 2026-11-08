import { InfoPageLayout } from "../components/layout/InfoPageLayout";

const faqs = [
  {
    question: "How do I book a venue?",
    answer:
      "Find a venue you like, choose your dates and number of guests in the booking form, and confirm. You need to be logged in to make a booking.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes. Go to Profile → My bookings, open the booking and choose “Delete booking”.",
  },
  {
    question: "How do I become a venue manager?",
    answer:
      "Tick the “Venue manager” option when you register. Venue managers can list, edit and delete their own venues.",
  },
  {
    question: "How do I see who has booked my venue?",
    answer:
      "Go to Profile → My venues and select a venue to see its upcoming bookings.",
  },
  {
    question: "Do I need a special email address?",
    answer: "Yes, you must register with a stud.noroff.no email address.",
  },
];

export function FaqPage() {
  return (
    <InfoPageLayout
      title="Frequently asked questions"
      intro="Answers to the most common questions about booking and hosting on Holidaze."
    >
      <div className="space-y-3">
        {faqs.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-xl bg-white px-5 py-4 shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
              {question}
              <span
                aria-hidden="true"
                className="text-mint-700 text-xl transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">{answer}</p>
          </details>
        ))}
      </div>
    </InfoPageLayout>
  );
}
