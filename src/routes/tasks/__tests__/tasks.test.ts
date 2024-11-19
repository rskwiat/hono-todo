/* eslint-disable */

import { testClient } from 'hono/testing';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ZodIssueCode } from 'zod';

import * as HttpStatusMessage from '@/constants/status-messages';

import { ZOD_ERROR_MESSAGES, ZOD_ERROR_CODES } from '@/constants/constants';
import env from '@/env';
import createApp from '@/lib/create-app';
import router from '../tasks.index';

if (env.NODE_ENV !== 'test') {
  throw new Error('NODE_ENV must be test');
}

const client = testClient(createApp().route('/', router));

describe('tasks route', () => {
  beforeAll(async () => {
    execSync('npm run migrate:push')
  });

  afterAll(async () => {
    fs.rmSync('test.db', { force: true });
  });

  it("post /tasks validates the body when creating", async () => {
    const response = await client.tasks.$post({
      // @ts-expect-error
      json: {
        completed: false
      }
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe('name');
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.REQUIRED);
    }
  });

  const id = "1";
  const name = "Learn vitest";

  it("post /tasks creates a task", async () => {
    const response = await client.tasks.$post({
      json: {
        name,
        completed: false,
      },
    });
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.name).toBe(name);
      expect(json.completed).toBe(false);
    }
  });

  it('get the /tasks/{id} validates the id param', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id: 'wat'
      }
    });

    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe('id');
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
    }
  });

  it('get /tasks/{id} returns 404 when not found', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id: '9999'
      }
    });

    expect(response.status).toBe(404);
    if (response.status === 404) {
      const json = await response.json();
      expect(json.message).toBe(HttpStatusMessage.NOT_FOUND);
    }
  });

  it('get /tasks/{id} gets a single task', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id
      }
    });

    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.name).toBe(name);
      expect(json.completed).toBe(false);
    }
  });

  it("patch /tasks/{id} validates the body when updating", async () => {
    const response = await client.tasks[":id"].$patch({
      param: {
        id,
      },
      json: {
        name: "",
      },
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("name");
      expect(json.error.issues[0].code).toBe(ZodIssueCode.too_small);
    }
  });

  it("patch /tasks/{id} validates the id param", async () => {
    const response = await client.tasks[":id"].$patch({
      param: {
        id: "wat",
      },
      json: {},
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("id");
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
    }
  });

  it("patch /tasks/{id} validates empty body", async () => {
    const response = await client.tasks[":id"].$patch({
      param: {
        id,
      },
      json: {},
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].code).toBe(ZOD_ERROR_CODES.INVALID_UPDATES);
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.NO_UPDATES);
    }
  });

  it('patch /tasks/{id} updates a single property of a task', async () => {
    const response = await client.tasks[":id"].$patch({
      param: {
        id,
      },
      json: {
        completed: true,
      },
    });
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.completed).toBe(true);
    }
  });

  it("delete /tasks/{id} validates the id when deleting", async () => {
    const response = await client.tasks[":id"].$delete({
      param: {
        id: "wat",
      },
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("id");
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
    }
  });

  it("delete /tasks/{id} removes a task", async () => {
    const response = await client.tasks[":id"].$delete({
      param: {
        id,
      },
    });
    expect(response.status).toBe(204);
  });

});
