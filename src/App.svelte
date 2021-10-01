<script lang="ts">
    import MaterialForm, {structure} from "./MaterialForm.svelte";
    import {
        Button,
        Card,
        CardBody,
        CardHeader,
        Col,
        Container,
        ListGroup,
        ListGroupItem,
        Row,
        TabContent,
        TabPane
    } from "sveltestrap";
    import {structuresStore} from "./store";
    import {Structures} from "./Structures";
    import {Amounts, MaterialEnum, MaterialKind} from "./MaterialKind";

    let lastId = -1;
    let summary: Map<number, Map<String, number[]>> = new Map();

    function addStructure() {
        structuresStore.update(v => {
            return [...v, new Structures(++lastId)];
        });
        showSummary();
    }

    function showSummary() {
        summary.clear();
        for (let s of structures) {
            let mats: Map<String, number[]> = new Map();
            for (let k of MaterialKind.keys()) {
                let am = calcAmounts(s.id, k);
                if (am.length > 0)
                    mats.set(k.valueOf(), am);
            }

            summary.set(s.id, mats);
        }
        summary = summary;
    }

    function calcAmounts(id: number, mk: MaterialEnum): number[] {
        const structure: Structures = structures.find(s => s.id === id);

        let stillMissing = structure.want.get(mk) - structure.have.get(mk);

        if (stillMissing <= 0)
            return [];

        if (!Amounts.has(mk))
            return [];

        const result: number[] = []
        while (stillMissing > 0) {
            let values = Amounts.get(mk).filter(v => v <= stillMissing);
            let p: number = 0;

            if (values.length == 0) {
                p = Math.min(...Amounts.get(mk).filter(v => v > stillMissing));
            } else {
                p = Math.max(...values);
            }

            stillMissing -= p;
            result.push(p);
        }

        return result;
    }

    function doneClick(id) {
        structuresStore.update(v => {
            return v.filter(f => f.id != id);
        })
    }

    let structures: Structures[];

    structuresStore.subscribe(s => {
        structures = s;
        showSummary();
    })
</script>

<main>
    <Container>
        <Row>
            <Col sm="12" md="6">
                <h1>Structures <Button on:click={addStructure}>+</Button></h1>
                <TabContent>
                    {#each structures as s}
                        <TabPane tabId={s.id} tab="Structure {s.id}" active="{s.id === lastId}">
                            <MaterialForm structure={s}/>
                        </TabPane>
                    {/each}

                </TabContent>
            </Col>
            <Col sm="12" md="6">
                <h1>Summary</h1>
                {#each [...summary] as [id, amounts]}
                    <Card>
                        <CardHeader>Structure {id}<Button color="danger" class="float-end" on:click={() => doneClick(id)}>Done</Button></CardHeader>
                        <CardBody>
                            <ListGroup>
                                {#each [...amounts] as [matName, valArr]}
                                    <ListGroupItem>{matName}: {valArr}</ListGroupItem>
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