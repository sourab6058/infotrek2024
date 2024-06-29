import React from "react";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CreateEvent } from "./CreateEvent";

export default function AdminPage() {
  return (
    <Admin
      dataProvider={simpleRestProvider("http://localhost:3000/api/admin")}
      basename="/admin"
    >
      <Resource
        name="users"
        list={ListGuesser}
        edit={EditGuesser}
        create={CreateEvent}
      />
      <Resource name="events" list={ListGuesser} create={CreateEvent} />
    </Admin>
  );
}
