<script lang="ts">
    import {Card, CardBody, CardTitle, Col, Container, FormGroup, Input, Label, Row} from "sveltestrap";
    import {MaterialKind} from "./MaterialKind";
    import {Structure} from "./Structure";
    import {structuresStore} from "./store";

    export let structure: Structure;

    function changeWantValue(key, value) {
        structure.want.set(key, value)
        updateStore();
    }

    function changeTitle(value) {
        structure.title = value;
        updateStore();
    }

    function changeHaveValue(key, value) {
        structure.have.set(key, value);
        updateStore();
    }

    function updateStore() {
        structuresStore.update(s => {
            return s.map(st => {
                if (st.id === structure.id) {
                    return structure;
                }
                return st;
            })
        })
    }

</script>

<main>
    {#if structure !== null}
        <Card>
            <CardTitle>
                <Input value={structure.title} on:keyup={e => changeTitle(e.target.value)}/>

            </CardTitle>
            <CardBody>
                <Container>
                    {#each [...MaterialKind] as [key, value]}
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="have_{key}">Placed {value}</Label>
                                    <Input id="have_{key}" type="number"
                                           on:keyup={event => changeHaveValue(key, event.target.value)}
                                           value={structure.have.get(key)}/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="want_{key}">Needed {value}</Label>
                                    <Input id="want_{key}" type="number"
                                           on:keyup={event => changeWantValue(key, event.target.value)}
                                           value={structure.want.get(key)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    {/each}
                </Container>
            </CardBody>
        </Card>
    {/if}
</main>
