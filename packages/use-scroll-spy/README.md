# useScrollSpy

> Inspiration taken from [Chakra-UI docs page](https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/hooks/use-scrollspy.ts)

## Installation

Install dependencies:

```bash
npm add @infinum/use-scroll-spy
```

## Usage

```tsx
// list of element to spy
const headingIds = ["section-1", "section-2"];

function SectionNavigation() {
  // convert those element to a CSS selectors; in this case `id`s are used
  const selectedId = useScrollSpy(headingIds.map((id) => `[id="${id}"]`));

  return (
    <nav>
      {headingIds.map((id) => (
        <a href={`#${id}`} data-active={selectedId.includes(id)}>
          {id}
        </a>
      ))}
    </nav>
  );
}

function Example() {
  // content is not rerendered on every heading update
  return (
    <main>
      <SectionNavigation />

      {headingIds.map((id) => (
        <section id={id}>
          <h2>{getSectionTitle(id)}</h2>
          <div>{getSectionContent(id)}</div>
        </section>
      ))}
    </main>
  );
}
```
