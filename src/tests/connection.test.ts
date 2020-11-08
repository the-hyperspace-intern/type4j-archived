import test from "ava";
import { Connection } from "../connection/Connection";

export async function GenerateConnection(): Promise<Connection> {
  const testConnection = new Connection({
    name: "test",
    host: "bolt://localhost:7687",
    username: "neo4j",
    password: "bigmilkers609",
    database: "default",
  });

  await testConnection.connect();
  return testConnection;
}

test("test connection to neo4j w/ correct auth", async (t) => {
  // Correct Identifier
  const testConnection = new Connection({
    name: "test",
    host: "bolt://localhost:7687",
    username: "neo4j",
    password: "bigmilkers609",
    database: "default",
  });
  await t.notThrowsAsync(async () => {
    await testConnection.connect();
  });
});

test("test connection to neo4j w/o correct auth", async (t) => {
  // Uncorrect Identifier
  const testConnection = new Connection({
    name: "test",
    host: "bolt://localhost:7687",
    username: "neo4j",
    password: "smallmilkers420",
    database: "default",
  });
  const error = await t.throwsAsync(async () => {
    await testConnection.connect();
  });

  t.is(
    error.message,
    "Could not establish connection : Neo.ClientError.Security.Unauthorized"
  );
});

test("test connection connect twice", async (t) => {
  const testConnection = new Connection({
    name: "test",
    host: "bolt://localhost:7687",
    username: "neo4j",
    password: "bigmilkers609",
    database: "default",
  });
  const error = await t.throwsAsync(async () => {
    await testConnection.connect();
    await testConnection.connect();
  });
  t.is(error.name, "CannotConnectAlreadyConnectedError");
});
