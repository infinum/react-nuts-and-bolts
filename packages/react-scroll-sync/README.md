# @infinum/react-scroll-sync

A component that will sync the scroll between multiple scroll containers

## Installation

```sh
yarn add @infinum/react-scroll-sync
# or
npm i @infinum/react-scroll-sync
```

## Usage

```jsx
import ScrollSync from '@infinum/react-scroll-sync';

const App = () => (
	<ScrollSync>
		<div className="scrollable">
			<ScrollSyncPane>
				<div className="scrollable__content">
					<p>Scroll me!</p>
				</div>
			</ScrollSyncPane>
		</div>
		<div className="scrollable">
			<ScrollSyncPane>
				<div className="scrollable__content">
					<p>Scroll me!</p>
				</div>
			</ScrollSyncPane>
		</div>
	</ScrollSync>
);
```

## Contribution

Yes please! See the
[contributing guidelines](https://github.com/infinum/react-nuts-and-bolts/blob/master/CONTRIBUTING.md)
for details.

## Licence

This project is licensed under the terms of the
[MIT license](https://github.com/infinum/react-nuts-and-bolts/blob/master/LICENSE).

# Credits

ScrollSync is maintained and sponsored by
[Infinum](https://www.infinum.com).

<p align="center">
  <a href='https://infinum.com'>
    <picture>
        <source srcset="https://assets.infinum.com/brand/logo/static/white.svg" media="(prefers-color-scheme: dark)">
        <img src="https://assets.infinum.com/brand/logo/static/default.svg">
    </picture>
  </a>
</p>
```
