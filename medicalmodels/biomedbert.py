import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key=os.environ["HF_TOKEN"],
)

result = client.fill_mask(
    "The answer to the universe is [MASK].",
    model="microsoft/BiomedNLP-BiomedBERT-base-uncased-abstract-fulltext",
)
