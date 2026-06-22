export const POWERBI_CSS = `
  .reports-wrap {
    max-width: 1400px; margin: 0 auto; padding: 24px 36px;
  }
  .reports-title {
    font-family: 'Spectral', serif; font-weight: 600; font-size: 34px;
    letter-spacing: -0.5px; margin: 0 0 6px; color: #222226;
  }
  .reports-sub {
    font-family: 'Spectral', serif; font-style: italic; font-size: 15px;
    color: #6A6A6F; margin: 0 0 24px;
  }
  .pbi-frame {
    width: 100%; height: calc(100vh - 180px);
    border: 1px solid #E3E3DE; border-radius: 12px; overflow: hidden;
  }
  .pbi-loading, .pbi-error {
    font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;
    color: #6A6A6F; padding: 48px; text-align: center;
  }
  .pbi-error { color: #C2603F; }
  .pbi-auth {
    text-align: center; padding: 80px 36px;
    border: 1px dashed #D4D4CF; border-radius: 12px;
    background: #F7F7F4;
  }
  .pbi-auth-icon { font-size: 36px; margin-bottom: 16px; }
  .pbi-auth-heading {
    font-family: 'Spectral', serif; font-size: 20px; font-weight: 600;
    color: #222226; margin: 0 0 8px;
  }
  .pbi-auth-detail {
    font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;
    color: #6A6A6F; margin: 0; line-height: 1.6;
  }
  .pbi-auth-detail a {
    color: #B5862A; text-decoration: underline;
    text-underline-offset: 2px;
  }
  .pbi-auth-detail a:hover { color: #222226; }
  @media (max-width: 900px) {
    .reports-wrap { padding: 20px; }
    .pbi-frame { height: calc(100vh - 160px); border-radius: 8px; }
  }
`;
