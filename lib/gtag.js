export default function event({ action, category, label, value }) {
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (e) {
    console.error(e);
  }
}
