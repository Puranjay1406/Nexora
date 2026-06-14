export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© 2026 NEXORA. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink">Privacy Policy</a>
          <a href="#" className="hover:text-ink">Terms of Service</a>
          <a href="#" className="hover:text-ink">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}