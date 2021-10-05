<script lang="ts">
    import MaterialForm from "./MaterialForm.svelte";
    import {Button, Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Row} from "sveltestrap";
    import {structuresStore} from "./store";
    import {Structure} from "./Structure";
    import Summary from "./Summary";

    let lastId = 0;
    let summary: Summary[] = [];
    $: summary;

    let summaryTotal: Map<string, Map<number, number>> = new Map();
    $: summaryTotal;

    let curStructure: Structure = null;
    $: curStructure;

    function addStructure() {
        curStructure = new Structure(++lastId);
        structuresStore.update(v => {
            return [...v, curStructure];
        });
    }

    function doneClick(id) {
        structuresStore.update(v => {
            if (id === curStructure.id) {
                curStructure = null;
            }
            return v.filter(f => f.id != id);
        })
    }


    structuresStore.subscribe(s => {
        summary = [];
        summary = s.map(st => new Summary(st));
    });

</script>

<main>
    <Container>
        <Row>
            <Col sm="12" md="6">
                <h1>Structures
                    <Button on:click={addStructure}>+</Button>
                </h1>
                <MaterialForm structure={curStructure}/>

            </Col>
            <Col sm="12" md="6">
                <h1>Summary</h1>
                {#each [...summary] as s}
                    <Card>
                        <CardHeader on:click={() => curStructure = s.structure}>{s.structure.title}
                            <Button color="danger" class="float-end" on:click={() => doneClick(s.structure.id)}>Done
                            </Button>
                        </CardHeader>
                        <CardBody>
                            <ListGroup>
                                {#each [...s.getAmounts()] as [matName, valArr]}
                                    <ListGroupItem>
                                        {matName}: {[...valArr].map(v => `${v[0]}x${v[1]}`).join(", ")}
                                    </ListGroupItem>
                                {/each}
                            </ListGroup>
                        </CardBody>
                    </Card>
                {/each}
            </Col>
        </Row>
    </Container>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>