/**
 * src/components/sections/Solutions.jsx
 *
 * Sección: Soluciones Atomix Solutions
 *
 * Objetivo:
 * - Traducir el portafolio de productos en soluciones funcionales
 * - Mejorar comprensión del usuario antes de conversión
 *
 * Ubicación en landing:
 * Hero → Trust → Solutions
 */

// export default function Solutions() {
//   /**
//    * Soluciones principales del negocio.
//    * Representan el catálogo traducido a lenguaje funcional.
//    */
//   const solutions = [
//     {
//       title: "Dispensación controlada",
//       desc: "Bombas dosificadoras para líquidos de diferentes viscosidades.",
//     },
//     {
//       title: "Aplicación por spray",
//       desc: "Triggers y atomizadores para distribución uniforme del producto.",
//     },
//     {
//       title: "Sistemas de cierre",
//       desc: "Tapas disktop y roscadas con sellado seguro y compatibilidad industrial.",
//     },
//     {
//       title: "Personalización industrial",
//       desc: "Adaptación de color, tamaño y especificaciones según cada cliente.",
//     },
//   ];

//   return (
//     <section className="w-full py-16 md:py-24">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* HEADER */}
//         <div className="mb-10 md:mb-14">
//           <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
//             Soluciones
//           </p>

//           <h2 className="text-2xl md:text-4xl font-semibold text-[var(--text-primary)]">
//             Componentes para sistemas de envasado
//           </h2>

//           <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-2xl">
//             Transformamos necesidades industriales en soluciones funcionales
//             para dispensación, cierre y aplicación de productos.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           {solutions.map((item, index) => (
//             <div
//               key={index}
//               className="
//                 p-6
//                 rounded-2xl
//                 border
//                 bg-[var(--bg-soft)]
//                 transition-all duration-300
//                 hover:shadow-md
//                 hover:translate-y-[-2px]
//               "
//               style={{ borderColor: "var(--border-default)" }}
//             >
//               <h3 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">
//                 {item.title}
//               </h3>

//               <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/**
 * src/components/sections/Solutions.jsx
 */

export default function Solutions() {
  const solutions = [
    {
      index: "01",
      title: "Dispensación controlada",
      desc: "Bombas dosificadoras para líquidos de diferentes viscosidades.",
    },
    {
      index: "02",
      title: "Aplicación por spray",
      desc: "Triggers y atomizadores para distribución uniforme del producto.",
    },
    {
      index: "03",
      title: "Sistemas de cierre",
      desc: "Tapas disktop y roscadas con sellado seguro y compatibilidad industrial.",
    },
    {
      index: "04",
      title: "Personalización industrial",
      desc: "Adaptación de color, tamaño y especificaciones según cada cliente.",
    },
  ];

  return (
    <section className="w-full bg-[var(--bg-main)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* HEADER — mismo tratamiento que TrustTitle */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="block w-5 h-0.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Soluciones
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Componentes para{" "}
            <span style={{ color: "var(--brand-primary)" }}>
              sistemas de envasado
            </span>
          </h2>

          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Transformamos necesidades industriales en soluciones funcionales
            para dispensación, cierre y aplicación de productos.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)]">
          {solutions.map((item) => (
            <div
              key={item.index}
              className="
                group
                bg-[var(--bg-main)]
                p-8 md:p-10
                flex flex-col gap-4
                transition-colors duration-300
                hover:bg-[var(--bg-soft)]
              "
            >
              {/* Número + línea de acento */}
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {item.index}
                </span>
                <span
                  className="h-px flex-1 max-w-8 transition-all duration-300 group-hover:max-w-16"
                  style={{ backgroundColor: "var(--border-default)" }}
                />
              </div>

              {/* Título */}
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                {item.title}
              </h3>

              {/* Descripción */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
