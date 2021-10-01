<script lang="ts">
    import {Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Input, Label, Row} from "sveltestrap";
    import {MaterialKind} from "./MaterialKind";
    import {Structures} from "./Structures";
    import {structuresStore} from "./store";

    export let structure: Structures;

    function changeWantValue(key, value) {
        structure.want.set(key, value)
        structuresStore.update(s => {
            return s.map(st => {
                if (st.id === structure.id) {
                    return structure;
                }
                return st;
            })
        })
    }

    function changeHaveValue(key, value) {
        structure.have.set(key, value)
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
    <Card>
        <CardTitle>
            Structure {structure.id}
        </CardTitle>
        <CardBody>
            <Container>
            {#each [...MaterialKind] as [key, value]}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="want_{key}">Needed {value}</Label>
                            <Input id="want_{key}" type="number" on:blur={event => changeWantValue(key, event.target.value)} value={structure.want.get(key)}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="have_{key}">Placed {value}</Label>
                            <Input id="have_{key}" type="number" on:blur={event => changeHaveValue(key, event.target.value)} value={structure.have.get(key)}/>
                        </FormGroup>
                    </Col>

                </Row>
            {/each}
            </Container>
        </CardBody>
    </Card>
</main>
