// "use client";
import Form from "@/components/employee/create-form";
export default function Page({ params }) {
  const id = params.id;
  console.log(id);
  //   console.log(12312);
  return (
    <main>
      <Form />
    </main>
  );
}
