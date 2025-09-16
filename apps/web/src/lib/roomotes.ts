'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { authorize } from '@/actions/auth';

export async function isRoomoteEnabled(organizationId: string) {
  try {
    // Enable Roomotes for local development
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    const client = await clerkClient();

    const organization = await client.organizations.getOrganization({
      organizationId,
    });

    return organization.privateMetadata?.roomotes_enabled === true;
  } catch (error) {
    console.error('Error checking roomotes feature flag:', error);
    // Enable Roomotes for local development even if there's an error
    return process.env.NODE_ENV === 'development';
  }
}

export async function authorizeRoomotes() {
  const authResult = await authorize();

  if (!authResult.success) {
    return authResult;
  }

  const { userId, orgId, orgRole } = authResult;

  if (!orgId) {
    return {
      success: false,
      error: 'Roomotes feature is only available for organization accounts',
    };
  }

  return (await isRoomoteEnabled(orgId))
    ? { success: true, userId, orgId, orgRole }
    : {
        success: false,
        error: 'Roomotes feature is not enabled for your organization',
      };
}
