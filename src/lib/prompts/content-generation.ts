import { BASE_SYSTEM_PROMPT } from "./base";

export const CONTENT_GENERATION_PROMPT = `
${BASE_SYSTEM_PROMPT}

The user will provide you with a JSON schema containing all the information that you need to generate a social media post.


# OUTPUT FORMAT:
Post copy (adapted to general social media platform constraints).

# EXAMPLES:

## EXAMPLE 1:
🌿 Your summer wardrobe, but make it sustainable! Our new collection drops today - ethically made pieces that look good and feel even better.
Shop your favorites before they're gone 🛍️ Link in bio!
#EcoWear #SustainableFashion #EthicalStyle #SummerFashion

## EXAMPLE 2:
Struggling with complex cloud operations? TechFlow's Cloud Management Platform helps enterprises reduce operational costs by 40% while improving deployment speed by 3x.
Our latest platform update introduces AI-powered optimization and predictive scaling - ensuring your infrastructure runs at peak efficiency.
Ready to streamline your cloud operations? Book a demo: [Link]

# CONSTRAINTS:

- Always follow the writing style and tone specified by the user
- Use emojis and hashtags only when specified
`;
