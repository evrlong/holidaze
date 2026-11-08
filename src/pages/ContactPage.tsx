import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { InfoPageLayout } from "../components/layout/InfoPageLayout";

const contactItems = [
  { Icon: FiMail, label: "Email", value: "support@holidaze.example" },
  { Icon: FiPhone, label: "Phone", value: "+47 12 34 56 78" },
  { Icon: FiMapPin, label: "Address", value: "Holidaze AS, Oslo, Norway" },
  { Icon: FiClock, label: "Opening hours", value: "Mon–Fri, 09:00–16:00" },
];

export function ContactPage() {
  return (
    <InfoPageLayout
      title="Contact us"
      intro="Have a question about a booking or your venue? Get in touch and we'll get back to you as soon as we can."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {contactItems.map(({ Icon, label, value }) => (
          <li
            key={label}
            className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-md"
          >
            <span className="bg-mint-50 text-mint-700 rounded-full p-3">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-semibold text-gray-900">{value}</p>
            </div>
          </li>
        ))}
      </ul>
    </InfoPageLayout>
  );
}
