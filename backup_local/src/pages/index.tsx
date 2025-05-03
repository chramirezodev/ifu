import About from '@/components/sections/About';

export default function Home() {
  return (
    <main>
      <About
        title="Nosotros"
        content="Somos inmigrantes y conocemos los desafíos que se presentan al establecerse en este país. Por eso, te acompañamos en cada paso del proceso para que tú y tu familia tengan la mejor orientación y respaldo."
        values={[
          {
            title: "Confiabilidad",
            description: "Puedes confiar en nosotros para manejar tu proceso con integridad y profesionalismo."
          },
          {
            title: "Eficiencia",
            description: "Optimizamos cada paso para que tu proceso avance de manera rápida y segura."
          },
          {
            title: "Experiencia",
            description: "Contamos con el conocimiento y la experiencia para resolver cualquier situación migratoria."
          }
        ]}
      />
    </main>
  );
} 