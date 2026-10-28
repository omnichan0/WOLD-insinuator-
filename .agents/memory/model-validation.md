---
name: Local GGUF validation
description: How to distinguish a real model weight file from a dead download and a runtime-compatible model.
---

A GGUF file can have a valid header, metadata, and tensor table while still failing inference at runtime. Model checks must include a real llama.cpp tokenize or completion request, not only file size or container parsing.

**Why:** The canonical KL file contains real tensors and loads successfully, but its tokenizer metadata causes `unordered_map::at` during tokenization with the current llama.cpp build.

**How to apply:** Keep the KL file as the only canonical weight until a replacement is supplied, but treat AI health as incomplete unless a real inference probe succeeds.