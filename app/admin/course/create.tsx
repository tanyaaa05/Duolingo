import { Create, required, SimpleForm, TextInput } from "react-admin";

export const CourceCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};
