'use client';

import { useState } from 'react';
import { Icon } from './Icon';

/**
 * Mapa sob demanda: nada é carregado de serviço externo antes da ação do
 * visitante. Em telas de toque, uma camada evita capturar a rolagem até o
 * visitante decidir interagir com o mapa.
 */
export function MapEmbed({
  embedUrl,
  title,
  provider,
  approximate,
  openUrl,
}: {
  embedUrl: string;
  title: string;
  provider: string;
  approximate: boolean;
  openUrl: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [interactive, setInteractive] = useState(false);

  return (
    <div className="map-box">
      {approximate && (
        <span className="map-box__label badge badge--pending">
          <Icon name="info" />
          Localização aproximada — sem marcação de endereço
        </span>
      )}
      {loaded ? (
        <>
          <iframe
            src={embedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {!interactive && (
            <button type="button" className="map-box__shield" onClick={() => setInteractive(true)}>
              <span>Toque para interagir com o mapa</span>
            </button>
          )}
        </>
      ) : (
        <div className="map-box__placeholder">
          <span className="map-box__pin">
            <Icon name="pin" />
          </span>
          <p>
            O mapa é fornecido por serviço externo ({provider}) e só é carregado quando você solicitar.
            {approximate && ' Enquanto o endereço não é confirmado, exibimos apenas a região de Franco da Rocha — SP.'}
          </p>
          <button type="button" className="btn btn--ghost" onClick={() => setLoaded(true)}>
            <Icon name="pin" />
            Carregar mapa
          </button>
        </div>
      )}
      <noscript>
        <a href={openUrl}>Abrir localização no Google Maps</a>
      </noscript>
    </div>
  );
}
