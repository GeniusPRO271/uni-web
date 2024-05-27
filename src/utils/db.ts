import { CourseData } from "@/app/page";
import { data } from "@/app/smaple-data";

function parseCurrency(currencyString: string) {
  return parseInt(currencyString.replace(/\./g, "").replace("$", ""), 10);
}

function SortData(sort: string, data: CourseData[]): CourseData[] {
  const courses = data;
  switch (sort) {
    case "vacantesAsc":
      courses.sort(
        (a: CourseData, b: CourseData) =>
          parseInt(a.vacantes) - parseInt(b.vacantes)
      );
      return courses;
    case "vacantesDsc":
      courses.sort(
        (a: CourseData, b: CourseData) =>
          parseInt(b.vacantes) - parseInt(a.vacantes)
      );
      return courses;
    case "ultimomatriculadoAsc":
      courses.sort(
        (a: CourseData, b: CourseData) =>
          parseInt(a.puntajeUltimoMatriculado) -
          parseInt(b.puntajeUltimoMatriculado)
      );
      return courses;
    case "ultimomatriculadoDsc":
      courses.sort(
        (a: CourseData, b: CourseData) =>
          parseInt(b.puntajeUltimoMatriculado) -
          parseInt(a.puntajeUltimoMatriculado)
      );
      return courses;
    case "arancelanualAsc":
      courses.sort(
        (a: CourseData, b: CourseData) =>
          parseCurrency(a.arancelAnual2024) - parseCurrency(b.arancelAnual2024)
      );
      return courses;

    case "arancelanualDsc":
      courses.sort(
        (a: CourseData, b: CourseData) =>
          parseCurrency(b.arancelAnual2024) - parseCurrency(a.arancelAnual2024)
      );
      return courses;
    default:
      return courses;
  }
}

export async function getCourses(
  search: string,
  offset: number,
  sort: string
): Promise<{
  spaces: CourseData[];
  newOffset: number | null;
}> {
  console.log("get params: ", search, offset, sort);
  try {
    // If search term is provided, filter users based on search term
    let courses = data;

    if (sort) {
      courses = SortData(sort, courses);
    }

    if (search) {
      const filteredUsers = courses.filter((space: CourseData) =>
        space.nombre.toLowerCase().includes(search.toLowerCase())
      );
      return {
        spaces: filteredUsers,
        newOffset: null,
      };
    }

    // If offset is null, return empty users array and null offset
    if (offset === null) {
      return { spaces: [], newOffset: null };
    }

    // If offset is provided, return users based on offset and limit
    console.log("returning data");
    const endIndex = offset + 20;
    const moreUsers = courses;
    const newOffset = endIndex < data.length ? endIndex : null;
    return { spaces: moreUsers, newOffset };
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    return { spaces: [], newOffset: null };
  }
}
