# Professional Software Engineer Portfolio

A high-performance, interactive portfolio website featuring advanced 3D visualizations and modern web development patterns. Built with **React 19**, **Three.js**, and **Vite**.

## 🚀 Technical Highlights

### 1. Interactive 3D Technical Core
The centerpiece of this portfolio is an interactive **3D Rubik's Cube** built with `@react-three/fiber`. Unlike static lists, this component provides a tactile and engaging way to explore the technical stack.

- **Dynamic Texture Rendering**: Technology logos (React, TypeScript, Docker, etc.) are fetched from CDNs and rendered in real-time onto `CanvasTexture` surfaces.
- **PBR Materials**: Utilizes Physical Based Rendering with `MeshStandardMaterial` for realistic lighting, roughness, and metalness effects.
- **Procedural Scramble Logic**: Implements a custom algorithm to scramble the cube's state upon initialization through a sequence of random axis rotations and coordinate rounding to maintain grid alignment.
- **Interactive Controls**: Seamless integration with `OrbitControls` for 360-degree inspection with inertia and damping.

### 2. High-Performance Architecture
- **React 19 & TypeScript**: Leverages the latest React features and strict typing for robust component logic and state management.
- **Optimized Rendering**: Utilizes `useFrame` and `useMemo` hooks from `@react-three/fiber` to ensure smooth 60fps animations and efficient memory management for 3D assets.
- **Responsive Layout Engine**: Built with **Tailwind CSS**, featuring a single-screen height viewport design (`min-h-screen`) that dynamically adjusts spacing based on screen geometry.
- **SVG Animation**: Clean, lightweight icons and vector graphics for fast load times and crisp resolution on any display.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Tooling**: [Vite 6](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Logic**: Custom 3D pivot rotation and state reconciliation algorithms.

## 📦 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ethanranxu/NexusRan.git
   cd NexusRan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

### Production Build

Generate a highly optimized production bundle:
```bash
npm run build
```

## 📐 Implementation Details: The Tech Cube

The 3D Cube is composed of 27 individual `Cubie` components. Key implementation details:

- **Pivot Transformation**: Slices rotate by temporarily re-parenting relevant cubies to a central pivot group to handle complex 3D transformations.
- **State Reconciliation**: After each rotation, the world-space positions are rounded and synchronized back to the internal state to prevent floating-point drift.
- **Asynchronous Logo Loading**: Textures are updated only after the technology logos have been successfully loaded from the [SimpleIcons](https://simpleicons.org/) library.

## 📄 License

MIT
