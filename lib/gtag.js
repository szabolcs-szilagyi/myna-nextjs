export default function event(action, payload) {
  try {
    window.gtag('event', action, payload);
  } catch (e) {
    console.error(e);
  }
}
