"use client";

import { useState } from "react";
import { IconCompostBox } from "@/shared/ui/icons";
import { CO2_PER_ORDER_GRAMS } from "../data/content";

const formatKg = (grams: number) =>
  (grams / 1000).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function ImpactEstimator() {
  const [orders, setOrders] = useState(4);

  return (
    <div className="rotate-1 rounded-[22px] bg-white p-6 text-ink shadow-[0_25px_60px_rgba(9,29,21,0.24)]">
      <p className="text-[11px] font-bold tracking-widest text-ink-3 uppercase">Así se suma tu aporte</p>
      <h3 className="mt-1 text-title-3 text-forest">Un pedido a la vez</h3>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-body-small text-ink-3">Tu impacto estimado este mes</p>
          <p className="font-display text-[2.4rem] leading-none font-extrabold text-forest" aria-live="polite">
            {formatKg(orders * CO2_PER_ORDER_GRAMS)} <span className="text-title-3">kg CO₂</span>
          </p>
        </div>
        <p className="text-right text-label text-forest-2">
          ≈ {CO2_PER_ORDER_GRAMS} g
          <small className="block font-normal text-ink-3">por pedido</small>
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-sage p-4">
        <div className="flex items-center justify-between text-body-small">
          <label htmlFor="orders-per-month" className="font-semibold text-forest">
            ¿Cuántos pedidos hacés al mes?
          </label>
          <b className="text-forest-2">
            {orders} {orders === 1 ? "pedido" : "pedidos"}
          </b>
        </div>
        <input
          id="orders-per-month"
          type="range"
          min={1}
          max={20}
          value={orders}
          onChange={(e) => setOrders(Number(e.target.value))}
          aria-describedby="estimator-note"
          className="mt-3 w-full accent-forest-2"
        />
        <div className="flex justify-between text-footer font-normal text-ink-3">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-line-soft/70 px-4 py-3 text-body-small">
        <span className="inline-flex items-center gap-2 text-ink-2">
          <IconCompostBox size={18} className="text-forest-2" /> Envases compostables
        </span>
        <b className="text-forest">
          {orders} {orders === 1 ? "envase" : "envases"}
        </b>
      </div>

      <p id="estimator-note" className="mt-4 border-t border-line-soft/60 pt-3 text-center text-footer font-normal text-ink-3">
        Cálculo orientativo: promedio de {CO2_PER_ORDER_GRAMS} g de CO₂ evitados por pedido sustentable.
      </p>
    </div>
  );
}
