import test from "ava";
import { Connection } from "../connection/Connection";
import { NodeEntity } from "../decorators/NodeEntity";
import { GraphProp } from "../decorators/NodeProp";
import { BaseNodeEntity } from "../repository/BaseNodeEntity";
import { GenerateConnection } from "./connection.test";

async function GenerateNode(): Promise<MeowTesterEntity> {
  const testNode = new MeowTesterEntity();

  testNode.meowColor = "Kito"; // The name of my awful cat
  testNode.meowRace = "I wish I knew";
  await testNode.save();

  return testNode;
}

async function getNodeCount(testConnection: Connection): Promise<number> {
  return (
    await testConnection.driver.session.run(
      `MATCH (:MeowTesterEntity) RETURN count(*) as count`
    )
  ).records[0]["_fields"][0]["low"];
}

const testConnection = new Connection({
  name: "test",
  host: "bolt://localhost:7687",
  username: "neo4j",
  password: "bigmilkers609",
  database: "default",
});

@NodeEntity()
class MeowTesterEntity extends BaseNodeEntity {
  @GraphProp()
  meowRace: string;

  @GraphProp()
  meowColor: string;
}

// TODO: Better test with DeepEqual
test.serial("create new node", async (t) => {
  const testConnection = await GenerateConnection();
  const testNode = await GenerateNode();
  t.not(testNode.id, undefined);
});

// test.todo("delete node");
test.serial("delete node", async (t) => {
  const testConnection = await GenerateConnection();
  const testNode = await GenerateNode();
  const countAfterCreate = await getNodeCount(testConnection);

  await t.notThrowsAsync(async () => {
    await testNode.delete();
    const countAfterDelete = await getNodeCount(testConnection);
    t.is(countAfterDelete, countAfterCreate - 1);
  });
});

test.todo("find node entity");
