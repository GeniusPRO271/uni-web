import { Header } from "../components/header";
import "./globals.css";
import Footer from "../components/footer";
import Search from "../components/search";
import ContentTable from "../components/table";
import { getCourses } from "../utils/db";

export interface CourseData {
  id: string;
  carreraLinkHref: string;
  gradoAcademico: string;
  tituloProfesional: string;
  duracion: string;
  arancelAnual2024: string;
  codigoDEMRE: string;
  minPuntajePromedio: string;
  puntajeUltimoMatriculado: string;
  vacantes: string;
  reqNem: string;
  reqRank: string;
  reqCompLec: string;
  reqMat: string;
  reqHist: string;
  description: string;
  location: string;
  email?: string;
  phoneContact?: string;
  nombre: string;
  reqEspecial?: string;
  university?: string
}

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string; offset: string, sort:string };
}) {
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const sort = searchParams.sort ?? "";
  const { spaces, newOffset } = await getCourses(search, Number(offset), sort);

  return (
    <main className="flex min-h-screen p-2">
      <Header value={searchParams.sort}/>
      <Search
        value={searchParams.q}
        placeholder="Search"
      />
      <ContentTable courses={spaces} />
      <Footer />
    </main>
  );
}
