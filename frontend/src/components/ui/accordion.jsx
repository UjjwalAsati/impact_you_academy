export function Accordion({ children }) {
  return <div className="space-y-4">{children}</div>;
}

export function AccordionItem({ children }) {
  return (
    <div className="border rounded-md overflow-hidden">
      {children}
    </div>
  );
}

export function AccordionTrigger({ children }) {
  return (
    <div className="px-4 py-3 font-medium bg-gray-100">
      {children}
    </div>
  );
}

export function AccordionContent({ children }) {
  return (
    <div className="px-4 py-3 bg-white">
      {children}
    </div>
  );
}
