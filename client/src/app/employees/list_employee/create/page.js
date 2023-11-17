import Form from "@/components/employee/create-form";

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      {/* <Breadcrumbs
          breadcrumbs={[
            { label: "Invoices", href: "/dashboard/invoices" },
            {
              label: "Create Invoice",
              href: "/dashboard/invoices/create",
              active: true,
            },
          ]}
        /> */}
      {/* <Form /> */}
      <Form />
    </main>
  );
}
