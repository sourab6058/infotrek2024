import { Create, DateInput, SimpleForm, TextInput } from "react-admin";

export const CreateEvent = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="teaser" multiline={true} label="Short description" />
      <DateInput
        label="Publication date"
        source="published_at"
        defaultValue={new Date()}
      />
    </SimpleForm>
  </Create>
);
