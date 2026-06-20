export const TOAST_CSS = `
  .qq-toast-container {
    position: fixed; bottom: 24px; right: 24px; z-index: 300;
    display: flex; flex-direction: column-reverse; gap: 8px;
    pointer-events: none;
  }
  .qq-toast {
    pointer-events: auto;
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    font-size: 13px; line-height: 1.4;
    padding: 12px 18px; border-radius: 10px;
    background: #1E1E21; color: #E7E7E1;
    border: 1px solid rgba(230, 198, 88, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    animation: qq-toast-in 0.25s ease-out;
    max-width: 340px;
  }
  .qq-toast.success { border-left: 3px solid #5FA463; }
  .qq-toast.error { border-left: 3px solid #C2603F; }
  .qq-toast.info { border-left: 3px solid #B5862A; }
  .qq-toast.out { animation: qq-toast-out 0.2s ease-in forwards; }
  @keyframes qq-toast-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes qq-toast-out {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-8px); }
  }
  @media print { .qq-toast-container { display: none !important; } }
`;
