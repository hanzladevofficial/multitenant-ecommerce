import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  tenantFieldAccess: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
});

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: true,
  },
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
    },
    {
      admin: {
        position: "sidebar",
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField.admin || {}),
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterLogin: [
      async ({ user, req, context }) => {
        if (!user.tenants || user.tenants.length === 0) {
          // Create tenant
          const tenant = await req.payload.create({
            collection: "tenants",
            data: {
              name: user.username,
              subdomain: user.username,
              stripeAccountId: "mock",
            },
          });

          // Link tenant to user
          await req.payload.update({
            collection: "users",
            id: user.id,
            data: { tenants: [{ tenant: tenant.id }] },
          });
        }
      },
    ],
  },
};
