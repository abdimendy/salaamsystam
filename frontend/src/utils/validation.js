export function validateBusinessForm(form) {
  const errors = {};

  if (!form.name?.trim()) errors.name = 'Business name is required.';
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!form.phone?.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[\d\s+\-().]{7,20}$/.test(form.phone.trim()))
    errors.phone = 'Enter a valid phone number.';

  if (!form.email?.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Enter a valid email address.';

  if (!form.address?.trim()) errors.address = 'Address is required.';
  else if (form.address.trim().length < 5) errors.address = 'Address must be at least 5 characters.';

  if (!form.categoryId) errors.categoryId = 'Please select a category.';

  return errors;
}

export function validateCategoryForm(name) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Category name is required.';
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  return errors;
}
