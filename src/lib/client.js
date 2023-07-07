import sanityClient from '@sanity/client';
// import imageUrlBuilder from '@sanity/image-url';

// const builder = imageUrlBuilder(client);
// const imageUrl = source => {
//   return builder.image(source);
// };

const client = sanityClient({
    projectId: '6rz6ozsr',
    dataset: 'production',
    apiVersion: "2023-06-13",
    useCdn: false
})


// Update the user's role permissions
const updateUserPermissions = async (email) => {
  try {
    // Fetch the current roles
    const roles = await client.fetch('*[_type == "sanity.role"]');

    // Find the role you want to update
    const role = roles.find((r) => r.name === 'YOUR_ROLE_NAME');

    // Add the "create" permission for the desired schema type (e.g., "person")
    role.permissions = role.permissions.concat({
      resource: `person`,
      actions: ['create'],
    });

    // Update the role in Sanity
    await client
      .patch(role._id)
      .set({ permissions: role.permissions })
      .commit();

    console.log('Role permissions updated successfully.');
  } catch (error) {
    console.error('Error updating role permissions:', error);
  }
};

// Call the function and provide the user's email address
updateUserPermissions('abdurrahmankhan2003@gmail.com');


export default client
