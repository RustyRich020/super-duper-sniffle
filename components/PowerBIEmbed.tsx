"use client";

import { useEffect, useState } from "react";
import { PowerBIEmbed as PBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { POWERBI_CSS } from "./powerbi-css";

interface EmbedConfig {
  embedToken: string;
  embedUrl: string;
  expiry: string;
}

export default function PowerBIEmbed() {
  const [config, setConfig] = useState<EmbedConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/embed-token")
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 401 ? "Sign in to view reports" : "Failed to load report");
        return r.json();
      })
      .then(setConfig)
      .catch((e) => setError(e.message));
  }, []);

  const isAuthError = error === "Sign in to view reports";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: POWERBI_CSS }} />
      {error ? (
        <div className={isAuthError ? "pbi-auth" : "pbi-error"}>
          {isAuthError ? (
            <>
              <div className="pbi-auth-icon">&#128274;</div>
              <p className="pbi-auth-heading">Sign in to view reports</p>
              <p className="pbi-auth-detail">
                Connect your database and sign in on the{" "}
                <a href="/">Forms page</a> to access Power BI dashboards.
              </p>
            </>
          ) : (
            error
          )}
        </div>
      ) : !config ? (
        <div className="pbi-loading">Loading report...</div>
      ) : (
        <PBIEmbed
          embedConfig={{
            type: "report",
            embedUrl: config.embedUrl,
            accessToken: config.embedToken,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: { filters: { visible: false } },
              background: models.BackgroundType.Transparent,
              navContentPaneEnabled: true,
            },
          }}
          cssClassName="pbi-frame"
        />
      )}
    </>
  );
}
